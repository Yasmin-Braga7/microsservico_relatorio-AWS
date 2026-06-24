const service = require('../services/relatorio.service');

// ── Snapshots de Livros ────────────────────────────────────────────────────────
async function gerarSnapshotLivro(req, reply) {
    const data = await service.gerarSnapshotLivro(req.body);
    return reply.code(201).send({ success: true, data });
}

async function dashboardKpis(req, reply) {
    const data = await service.dashboardKpis();
    return reply.send({ success: true, data });
}

async function topLivrosLidos(req, reply) {
    const data = await service.topLivrosLidos();
    return reply.send({ success: true, data });
}

async function listarSnapshotLivros(req, reply) {
    const data = await service.listarSnapshotLivros();
    return reply.send({ success: true, data });
}

async function buscarSnapshotLivroId(req, reply) {
    const data = await service.buscarSnapshotLivroId(req.params.id);
    if (!data) return reply.code(404).send({ success: false, error: 'Snapshot de livro não encontrado.' });
    return reply.send({ success: true, data });
}

// ── Snapshots de Usuários ──────────────────────────────────────────────────────
async function gerarSnapshotUsuario(req, reply) {
    const data = await service.gerarSnapshotUsuario(req.body);
    return reply.code(201).send({ success: true, data });
}

async function usuariosInadimplentes(req, reply) {
    const data = await service.usuariosInadimplentes();
    return reply.send({ success: true, data });
}

async function listarSnapshotUsuarios(req, reply) {
    const data = await service.listarSnapshotUsuarios();
    return reply.send({ success: true, data });
}

async function buscarSnapshotUsuarioId(req, reply) {
    const data = await service.buscarSnapshotUsuarioId(req.params.id);
    if (!data) return reply.code(404).send({ success: false, error: 'Snapshot de usuário não encontrado.' });
    return reply.send({ success: true, data });
}

// ── Snapshots de Empréstimos ───────────────────────────────────────────────────
async function gerarSnapshotEmprestimo(req, reply) {
    const data = await service.gerarSnapshotEmprestimo(req.body);
    return reply.code(201).send({ success: true, data });
}

async function listarSnapshotEmprestimos(req, reply) {
    const data = await service.listarSnapshotEmprestimos();
    return reply.send({ success: true, data });
}

async function buscarSnapshotEmprestimoId(req, reply) {
    const data = await service.buscarSnapshotEmprestimoId(req.params.id);
    if (!data) return reply.code(404).send({ success: false, error: 'Snapshot de empréstimo não encontrado.' });
    return reply.send({ success: true, data });
}

// ── Relatórios centrais ────────────────────────────────────────────────────────
async function criar(req, reply) {
    const data = await service.criar(req.body);
    return reply.code(201).send({ success: true, data });
}

async function listar(req, reply) {
    const data = await service.listar();
    return reply.send({ success: true, data });
}

async function buscarPorId(req, reply) {
    const data = await service.buscarPorId(req.params.id);
    if (!data) return reply.code(404).send({ success: false, error: 'Relatório não encontrado.' });
    return reply.send({ success: true, data });
}

async function deletar(req, reply) {
    await service.deletar(req.params.id);
    return reply.code(204).send();
}

async function alterarStatus(req, reply) {
    const data = await service.alterarStatus(req.params.id, req.body);
    return reply.send({ success: true, data });
}

async function limparAntigos(req, reply) {
    const data = await service.limparAntigos();
    return reply.send({ success: true, data });
}

async function exportarCSV(req, reply) {
    const data = await service.exportarCSV();
    return reply.send({ success: true, data });
}

// ── Financeiro ─────────────────────────────────────────────────────────────────
async function totalMultas(req, reply) {
    const data = await service.totalMultas();
    return reply.send({ success: true, data });
}

module.exports = {
    gerarSnapshotLivro, dashboardKpis, topLivrosLidos, usuariosInadimplentes,
    criar, listar, buscarPorId, deletar, alterarStatus, limparAntigos, exportarCSV,
    listarSnapshotLivros, buscarSnapshotLivroId,
    gerarSnapshotUsuario, listarSnapshotUsuarios, buscarSnapshotUsuarioId,
    gerarSnapshotEmprestimo, listarSnapshotEmprestimos, buscarSnapshotEmprestimoId,
    totalMultas
};