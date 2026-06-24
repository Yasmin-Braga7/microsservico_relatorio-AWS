const ctrl = require('../controllers/relatorios.controller');

async function relatorioRoutes(fastify) {
    // ── Relatórios centrais ────────────────────────────────────────────────
    fastify.post('/relatorios', ctrl.criar);
    fastify.get('/relatorios', ctrl.listar);
    fastify.get('/relatorios/exportar/csv', ctrl.exportarCSV);
    fastify.delete('/relatorios/limpar-antigos', ctrl.limparAntigos);
    fastify.get('/relatorios/:id', ctrl.buscarPorId);
    fastify.delete('/relatorios/:id', ctrl.deletar);
    fastify.patch('/relatorios/:id/status', ctrl.alterarStatus);

    // ── Snapshots de Livros ────────────────────────────────────────────────
    fastify.post('/relatorios/livros', ctrl.gerarSnapshotLivro);
    fastify.get('/relatorios/livros', ctrl.listarSnapshotLivros);
    fastify.get('/relatorios/livros/top', ctrl.topLivrosLidos);
    fastify.get('/relatorios/livros/:id', ctrl.buscarSnapshotLivroId);

    // ── Snapshots de Usuários ──────────────────────────────────────────────
    fastify.post('/relatorios/usuarios', ctrl.gerarSnapshotUsuario);
    fastify.get('/relatorios/usuarios', ctrl.listarSnapshotUsuarios);
    fastify.get('/relatorios/usuarios/inadimplentes', ctrl.usuariosInadimplentes);
    fastify.get('/relatorios/usuarios/:id', ctrl.buscarSnapshotUsuarioId);

    // ── Snapshots de Empréstimos ───────────────────────────────────────────
    fastify.post('/relatorios/emprestimos', ctrl.gerarSnapshotEmprestimo);
    fastify.get('/relatorios/emprestimos', ctrl.listarSnapshotEmprestimos);
    fastify.get('/relatorios/emprestimos/:id', ctrl.buscarSnapshotEmprestimoId);

    // ── Dashboard e Financeiro ─────────────────────────────────────────────
    fastify.get('/relatorios/dashboard/kpis', ctrl.dashboardKpis);
    fastify.get('/relatorios/financeiro/multas-total', ctrl.totalMultas);
}

module.exports = relatorioRoutes;