const service = require('../services/relatorio.service');

async function gerarSnapshotLivro(req, res) {
    try {
        const data = await service.gerarSnapshotLivro(req.body);
        res.send(201, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function dashboardKpis(req, res) {
    try {
        const data = await service.dashboardKpis();
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function topLivrosLidos(req, res) {
    try {
        const data = await service.topLivrosLidos();
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function usuariosInadimplentes(req, res) {
    try {
        const data = await service.usuariosInadimplentes();
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function criar(req, res) {
    try {
        const data = await service.criar(req.body);
        res.send(201, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function listar(req, res) {
    try {
        const data = await service.listar();
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function buscarPorId(req, res) {
    try {
        const data = await service.buscarPorId(req.params.id);
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function deletar(req, res) {
    try {
        await service.deletar(req.params.id);
        res.send(204);
        
    } catch (err) {
        throw err;
    }
}

async function alterarStatus(req, res) {
    try {
        const data = await service.alterarStatus(req.params.id, req.body);
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function limparAntigos(req, res) {
    try {
        const data = await service.limparAntigos();
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function exportarCSV(req, res) {
    try {
        const data = await service.exportarCSV();
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function listarSnapshotLivros(req, res) {
    try {
        const data = await service.listarSnapshotLivros();
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function buscarSnapshotLivroId(req, res) {
    try {
        const data = await service.buscarSnapshotLivroId(req.params.id);
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function gerarSnapshotUsuario(req, res) {
    try {
        const data = await service.gerarSnapshotUsuario(req.body);
        res.send(201, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function listarSnapshotUsuarios(req, res) {
    try {
        const data = await service.listarSnapshotUsuarios();
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function buscarSnapshotUsuarioId(req, res) {
    try {
        const data = await service.buscarSnapshotUsuarioId(req.params.id);
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function gerarSnapshotEmprestimo(req, res) {
    try {
        const data = await service.gerarSnapshotEmprestimo(req.body);
        res.send(201, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function listarSnapshotEmprestimos(req, res) {
    try {
        const data = await service.listarSnapshotEmprestimos();
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function buscarSnapshotEmprestimoId(req, res) {
    try {
        const data = await service.buscarSnapshotEmprestimoId(req.params.id);
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

async function totalMultas(req, res) {
    try {
        const data = await service.totalMultas();
        res.send(200, { success: true, data });
        
    } catch (err) {
        throw err;
    }
}

module.exports = {
    gerarSnapshotLivro, dashboardKpis, topLivrosLidos, usuariosInadimplentes,
    criar, listar, buscarPorId, deletar, alterarStatus, limparAntigos, exportarCSV,
    listarSnapshotLivros, buscarSnapshotLivroId,
    gerarSnapshotUsuario, listarSnapshotUsuarios, buscarSnapshotUsuarioId,
    gerarSnapshotEmprestimo, listarSnapshotEmprestimos, buscarSnapshotEmprestimoId,
    totalMultas
};
