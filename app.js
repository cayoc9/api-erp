// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { sequelize, syncModels } = require('./models'); // Importa a instância do Sequelize e os modelos

// Importar rotas
const sectorRoutes = require('./routes/sectors');
const professionalRoutes = require('./routes/professionals');
const failureRoutes = require('./routes/failures');
const indicatorRoutes = require('./routes/indicators');
const hospitalRoutes = require('./routes/hospitals');
const formRoutes = require('./routes/forms'); // Rota de forms
const inconsistencyTypeRoutes = require('./routes/inconsistency-types');
const hospitalGroupRoutes = require('./routes/hospital-groups'); // Rota de hospital-groups
const statisticsRoutes = require('./routes/statistics'); // Rota de statistics
const patientRoutes = require('./routes/patients');
const internmentRoutes = require('./routes/internments');
const medicalRecordRoutes = require('./routes/medical-records');

// Importar middlewares
const authMiddleware = require('./middlewares/auth');
const requestLogger = require('./middlewares/requestLogger');
const rateLimiter = require('./middlewares/rateLimiter');

const app = express();
// habilitar o proxy
app.set('trust proxy', 1);

// Configurar opções do Swagger
const swaggerOptions = {
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
  apis: ['./routes/*.js'], // Caminho para os arquivos de rota
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Error Handler
const { errorHandler } = require('./utils/errorHandler');

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

// Adicionar middleware de log
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.use('/api/forms/with-failures', (req, res, next) => {
  if (req.method === 'POST') {
    console.log('Payload recebido em /forms/with-failures:', req.body);
  }
  next();
});

// Aplicar middlewares globais
app.use(requestLogger);
app.use(rateLimiter);

// Rotas públicas
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de autenticação para rotas protegidas
app.use('/api', authMiddleware);

// Rotas
app.use('/api/professionals', professionalRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/inconsistency-types', inconsistencyTypeRoutes);
app.use('/api/sectors', sectorRoutes);
app.use('/api/failures', failureRoutes);
app.use('/api/indicators', indicatorRoutes);
app.use('/api/hospitals', hospitalRoutes);
app.use('/api/hospital-groups', hospitalGroupRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/internments', internmentRoutes);
app.use('/api/medical-records', medicalRecordRoutes);

// Global error handling middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

/**
 * Primeiro, testamos a conexão com o banco.
 * Em seguida, sincronizamos modelos sem recriar tabelas.
 * Por fim, iniciamos o servidor.
 */
sequelize.authenticate()
  .then(async () => {
    console.log('Connected to the database...');
    try {
      // Forçar recriação do banco apenas em desenvolvimento
      const forceSync = process.env.NODE_ENV === 'development';

      if (forceSync) {
        console.log('Recriando estrutura do banco...');
        await sequelize.sync({ force: true });
      } else {
        await syncModels();
      }

      console.log('Models synchronized with the database.');
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Documentação disponível em: http://localhost:${PORT}/docs`);
      });
    } catch (error) {
      console.error('Error synchronizing models:', error);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Error connecting to database:', err);
    process.exit(1);
  });
