const fastify = require('fastify')({ logger: false });
require('dotenv').config();

const rabbitmq = require('./config/rabbitmq');

// Conectar ao RabbitMQ de forma assíncrona (inicia consumidores automaticamente)
rabbitmq.connect().catch(err => {
    console.error('[RabbitMQ] Erro na conexão inicial:', err.message);
});

// Registrando rotas
const relatorioRoutes = require('./routes/relatorio.routes');
fastify.register(relatorioRoutes);

// Rota de Healthcheck (utilizada pelo Docker)
fastify.get('/health', async () => {
    return { status: 'UP', timestamp: new Date() };
});

const PORT = process.env.PORT || 9504;
fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Servidor rodando em ${address}`);
});
