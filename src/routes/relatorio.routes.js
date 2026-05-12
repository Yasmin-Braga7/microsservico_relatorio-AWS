const ctrl = require('../controllers/relatorios.controller');

function relatorioRoutes(server) {
    // Endpoints Centrais de Relatórios
    server.post('/reservas', ctrl.criar);
    server.get('/reservas', ctrl.listar);
    server.get('/reservas/:id', ctrl.buscarPorId);
    server.del('/reservas/:id', ctrl.deletar);
    server.patch('/reservas/:id/status', ctrl.alterarStatus);
    server.del('/reservas/limpar-antigos', ctrl.limparAntigos);
    server.get('/reservas/exportar/csv', ctrl.exportarCSV);

    // Endpoints de Livros
    server.post('/reservas/livros', ctrl.gerarSnapshotLivro);
    server.get('/reservas/livros', ctrl.listarSnapshotLivros);
    server.get('/reservas/livros/:id', ctrl.buscarSnapshotLivroId);
    server.get('/reservas/livros/top', ctrl.topLivrosLidos);

    // Endpoints de Usuários
    server.post('/reservas/usuarios', ctrl.gerarSnapshotUsuario);
    server.get('/reservas/usuarios', ctrl.listarSnapshotUsuarios);
    server.get('/reservas/usuarios/:id', ctrl.buscarSnapshotUsuarioId);
    server.get('/reservas/usuarios/inadimplentes', ctrl.usuariosInadimplentes);

    // Endpoints de Empréstimos
    server.post('/reservas/emprestimos', ctrl.gerarSnapshotEmprestimo);
    server.get('/reservas/emprestimos', ctrl.listarSnapshotEmprestimos);
    server.get('/reservas/emprestimos/:id', ctrl.buscarSnapshotEmprestimoId);

    // Dashboards e Financeiro
    server.get('/reservas/dashboard/kpis', ctrl.dashboardKpis);
    server.get('/reservas/financeiro/multas-total', ctrl.totalMultas);
}

module.exports = relatorioRoutes;