// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { sequelize, sincronizarModelos } = require('./models');

// Importar rotas
const rotasSetor = require('./routes/setores');
const rotasProfissional = require('./routes/profissionais');
const rotasFalha = require('./routes/falhas');
const rotasIndicador = require('./routes/indicadores');
const rotasHospital = require('./routes/hospitais');
const rotasFormulario = require('./routes/formularios');
const rotasTipoInconsistencia = require('./routes/tipos-inconsistencia');
const rotasGrupoHospitalar = require('./routes/grupos-hospitares');
const rotasEstatistica = require('./routes/estatisticas');
const rotasPaciente = require('./routes/pacientes');
const rotasInternacao = require('./routes/internacoes');
const rotasProntuario = require('./routes/prontuarios');

// Importar middlewares
const autenticacao = require('./middlewares/autenticacao');
const registroRequisicao = require('./middlewares/registroRequisicao');
const limitadorRequisicao = require('./middlewares/limitadorRequisicao');
const rastreamento = require('./middlewares/rastreamento');
const paginacao = require('./middlewares/paginacao');

const app = express();
app.set('trust proxy', 1);

// Configurar opções do Swagger
const opcoesSwagger = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Gestão Hospitalar',
      version: '1.0.0',
      description: 'API para gerenciamento de falhas e inconsistências em prontuários médicos',
      contact: {
        name: "Equipe de Desenvolvimento",
        email: "suporte@hospital.com"
      }
    },
    servers: [
      {
        url: process.env.API_BASE_URL,
        description: 'Servidor de produção'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const especificacaoSwagger = swaggerJsdoc(opcoesSwagger);

// Tratamento de Erros
const { tratadorErros } = require('./utils/tratadorErros');

// Middlewares
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://10.100.59.94:5173',
    'https://plataformas.icsf.com.br',
    'http://plataformas.icsf.com.br'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(express.json());
app.use(registroRequisicao);
app.use(limitadorRequisicao);
app.use(rastreamento);
app.use(paginacao);

// Rotas
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(especificacaoSwagger));
app.use('/api/setores', rotasSetor);
app.use('/api/profissionais', rotasProfissional);
app.use('/api/falhas', rotasFalha);
app.use('/api/indicadores', rotasIndicador);
app.use('/api/hospitais', rotasHospital);
app.use('/api/formularios', rotasFormulario);
app.use('/api/tipos-inconsistencia', rotasTipoInconsistencia);
app.use('/api/grupos-hospitares', rotasGrupoHospitalar);
app.use('/api/estatisticas', rotasEstatistica);
app.use('/api/pacientes', rotasPaciente);
app.use('/api/internacoes', rotasInternacao);
app.use('/api/prontuarios', rotasProntuario);

// Middleware global de tratamento de erros
app.use(tratadorErros);

const PORTA = process.env.PORT || 5000;

// Inicialização do servidor
sequelize.authenticate()
  .then(async () => {
    console.log('Conectado ao banco de dados...');
    try {
      console.log('Recriando estrutura do banco...');
      await sequelize.sync({ force: true });
      console.log('Modelos sincronizados com o banco de dados.');

      app.listen(PORTA, '0.0.0.0', () => {
        console.log(`Servidor rodando na porta ${PORTA}`);
        console.log(`Documentação disponível em: http://localhost:${PORTA}/docs`);
      });
    } catch (erro) {
      console.error('Erro ao sincronizar modelos:', erro);
      process.exit(1);
    }
  })
  .catch(erro => {
    console.error('Erro ao conectar ao banco de dados:', erro);
    process.exit(1);
  });
