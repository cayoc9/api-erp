# ERP Hospitalar - Backend

Sistema de gestão hospitalar para controle e análise de inconsistências em prontuários médicos, com integração de dados clínicos e administrativos.

## 🚀 Funcionalidades Principais

- **Gestão de Inconsistências**
  - Registro e acompanhamento de falhas
  - Classificação por tipos de inconsistência
  - Atribuição de responsáveis
  - Fluxo de resolução com histórico

- **Gestão Hospitalar**
  - Grupos e Subgrupos hospitalares
  - Cadastro de hospitais e setores
  - Controle de profissionais (médicos, enfermeiros, auditores)

- **Gestão de Pacientes**
  - Prontuários eletrônicos
  - Internações e altas.
  - Registros médicos detalhados

- **Dashboard Analítico**
  - Taxa de resolução em tempo real
  - Distribuição por tipos de inconsistência
  - Performance por setor/hospital
  - Indicadores de qualidade assistencial

## 🛠 Stack Tecnológica

| Camada          | Tecnologias                                                                 |
|-----------------|-----------------------------------------------------------------------------|
| Backend         | Node.js, Express, Sequelize                                                 |
| Banco de Dados  | PostgreSQL (com Redis para cache)                                           |
| Autenticação    | JWT, BCrypt                                                                 |
| Documentação    | Swagger/OpenAPI 3.0                                                         |
| Infraestrutura  | Docker, Nginx, PM2                                                          |
| Monitoramento   | Winston para logs, Jest para testes                                         |

## 📦 Estrutura do Projeto

```

## 📄 Documentação
A API está totalmente documentada com Swagger. Endpoints disponíveis:

- **Documentação Interativa:** `/api/docs`
- **Especificação OpenAPI:** `/api/docs-json`

## 🔒 Segurança
- Autenticação via JWT
- CORS configurado
- Rate limiting (100 requests/minuto)
- Todos os endpoints protegidos por RBAC


## 📌 Versão Atual
v2.1.0 - Março 2024