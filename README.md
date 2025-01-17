# ERP Hospitalar - Backend

Sistema de gestão hospitalar focado no controle e análise de inconsistências em prontuários médicos.

## 🚀 Funcionalidades

- **Gestão de Inconsistências**
  - Registro e acompanhamento de falhas em prontuários
  - Atribuição de responsáveis
  - Status de resolução

- **Estatísticas e Dashboards**
  - Gráficos de linha (taxa mensal de resolução)
  - Gráficos de pizza (pendentes vs resolvidos)
  - Gráficos de barra (distribuição por tipos)

- **Estrutura Organizacional**
  - Gestão de Grupos Hospitalares
  - Gestão de Hospitais
  - Gestão de Setores
  - Gestão de Profissionais

## 🛠️ Tecnologias

- Node.js
- Express
- Sequelize (PostgreSQL)
- Jest (Testes)
- Redis (Cache)
- Docker

## 📦 Estrutura do Projeto

```
backend/
├── config/          # Configurações (DB, Redis, etc)
├── controllers/     # Controladores REST
├── middlewares/     # Middlewares Express
├── migrations/      # Migrações Sequelize
├── models/         # Modelos Sequelize
├── routes/         # Rotas Express
├── services/       # Lógica de negócio
├── utils/          # Utilitários
└── tests/          # Testes automatizados
```

## 🚀 Começando

1. **Pré-requisitos**
```bash
- Node.js 18+
- PostgreSQL 14+
- Redis (opcional, para cache)
```

2. **Instalação**
```bash
# Clone o repositório
git clone https://seu-repositorio/erp-hospitalar

# Instale as dependências
cd erp-hospitalar/backend
npm install

# Configure as variáveis de ambiente
cp .env.example .env
# Edite .env com suas configurações

# Execute as migrações
npm run migrate

# Inicie o servidor
npm run dev
```

## 🧪 Testes

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

# Executar testes em watch mode
npm run test:watch
```

## 📚 API Endpoints

### Inconsistências
- `GET /api/failures` - Lista todas as inconsistências
- `POST /api/failures` - Registra nova inconsistência
- `PUT /api/failures/:id` - Atualiza inconsistência
- `DELETE /api/failures/:id` - Remove inconsistência

### Estatísticas
- `GET /api/statistics` - Dashboard completo
- `GET /api/statistics/resolutions` - Taxa de resolução
- `GET /api/statistics/status` - Distribuição de status
- `GET /api/statistics/breakdowns` - Análises detalhadas

## 🛠️ Deployment

```bash
# Usando PM2
npm run pm2:start

# Usando Docker
docker-compose up -d
```

## 🤝 Contribuindo

1. Fork o projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## ✨ Autores

* **Seu Nome** - *Trabalho Inicial* - [@seuGithub](https://github.com/seuGithub)

## 📝 Notas

- Sistema em desenvolvimento ativo
- Versão atual: 1.0.0
- Última atualização: Março 2024
