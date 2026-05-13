const restify = require('restify');
require('dotenv').config();

const server = restify.createServer({
    name: 'microsservico_relatorio'
});

server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser());

// Registrando rotas
const relatorioRoutes = require('./routes/relatorio.routes');
relatorioRoutes(server);

// Rota de Healthcheck (utilizada pelo Docker)
server.get('/health', (req, res, next) => {
    res.send(200, { status: 'UP', timestamp: new Date() });
    return next();
});


const PORT = process.env.PORT || 9504;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
