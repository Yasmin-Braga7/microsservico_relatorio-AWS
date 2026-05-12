/**
 * src/config/rabbitmq.js
 *
 * Gerencia a conexão persistente com o RabbitMQ.
 * Reconecta automaticamente em caso de queda.
 *
 * Uso:
 *   const { publish } = require('../config/rabbitmq');
 *   await publish('biblioteca.relatorio.criado', { relatorioId: 1 });
 */

const amqplib = require('amqplib');

const RABBITMQ_URL = process.env.RABBITMQ_URL || 'amqp://admin:admin@10.136.38.50:5672';
const RECONNECT_DELAY_MS = Number(process.env.RABBITMQ_RECONNECT_DELAY) || 5000;
const EXCHANGE = 'biblioteca';        // exchange fanout principal
const EXCHANGE_TYPE = 'topic';             // topic para roteamento por serviço

let connection = null;
let channel = null;
let connecting = false;

// ─── Conecta e declara o exchange ────────────────────────────────────────────
async function connect() {
    if (connecting) return;
    connecting = true;

    try {
        console.log('[RabbitMQ] Conectando em', RABBITMQ_URL.replace(/:\/\/.*@/, '://***@'));
        connection = await amqplib.connect(RABBITMQ_URL);
        channel = await connection.createChannel();

        // Declara o exchange (idempotente — OK se já existir)
        await channel.assertExchange(EXCHANGE, EXCHANGE_TYPE, { durable: true });

        console.log('[RabbitMQ] Conectado. Exchange:', EXCHANGE);
        connecting = false;

        // Reconecta se a conexão cair
        connection.on('close', () => {
            console.warn('[RabbitMQ] Conexão encerrada. Reconectando em', RECONNECT_DELAY_MS, 'ms...');
            connection = null;
            channel = null;
            connecting = false;
            setTimeout(connect, RECONNECT_DELAY_MS);
        });

        connection.on('error', (err) => {
            console.error('[RabbitMQ] Erro na conexão:', err.message);
        });

    } catch (err) {
        connecting = false;
        console.error('[RabbitMQ] Falha ao conectar:', err.message, '— tentando novamente em', RECONNECT_DELAY_MS, 'ms');
        setTimeout(connect, RECONNECT_DELAY_MS);
    }
}

// ─── Publica um evento ────────────────────────────────────────────────────────
/**
 * @param {string} routingKey  Ex: "biblioteca.emprestimo.criado"
 * @param {object} payload     Objeto JS — será serializado em JSON
 * @returns {boolean}          true se publicou, false se canal indisponível
 */
async function publish(routingKey, payload) {
    if (!channel) {
        console.warn('[RabbitMQ] Canal indisponível. Evento não publicado:', routingKey);
        return false;
    }

    try {
        const buffer = Buffer.from(JSON.stringify(payload));
        channel.publish(EXCHANGE, routingKey, buffer, {
            persistent: true,           // sobrevive a reinicialização do broker
            contentType: 'application/json',
            timestamp: Math.floor(Date.now() / 1000),
            appId: 'biblioteca-relatorio',
        });
        console.log('[RabbitMQ] Publicado:', routingKey, payload);
        return true;
    } catch (err) {
        console.error('[RabbitMQ] Erro ao publicar:', err.message);
        return false;
    }
}

// ─── Fecha a conexão (para graceful shutdown) ─────────────────────────────────
async function close() {
    try {
        if (channel) await channel.close();
        if (connection) await connection.close();
        console.log('[RabbitMQ] Conexão encerrada com segurança.');
    } catch (_) { }
}

// ─── Chaves de roteamento dos eventos deste microsserviço ────────────────────
const EVENTS = {
    RELATORIO_CRIADO: 'biblioteca.relatorio.criado',
    RELATORIO_ATUALIZADO: 'biblioteca.relatorio.atualizado',
    RELATORIO_DELETADO: 'biblioteca.relatorio.deletado',
    SNAPSHOT_LIVRO_GERADO: 'biblioteca.relatorio.snapshot_livro.gerado',
    SNAPSHOT_USUARIO_GERADO: 'biblioteca.relatorio.snapshot_usuario.gerado',
    SNAPSHOT_EMPRESTIMO_GERADO: 'biblioteca.relatorio.snapshot_emprestimo.gerado',
};

module.exports = { connect, publish, close, EVENTS };