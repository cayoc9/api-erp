# Plano de Refatoração do Sistema

## 1. Visão Geral das Mudanças

### 1.1 Objetivos Principais
- Padronizar estrutura de código e nomenclatura
- Eliminar redundâncias
- Melhorar validações e segurança
- Implementar herança para reduzir duplicação
- Otimizar associações entre models
- Implementar BaseModel com campos de auditoria
- Padronizar timestamps e nomenclatura

### 1.2 Padronização de Nomenclatura
- Renomear campos em português para inglês
- Manter padrão camelCase para propriedades
- Manter padrão snake_case para campos no banco
- Remover model Responsible (usar Professional)
- Consolidar campos duplicados em Failure
- Padronizar campos de tracking

## 2. Ordem de Implementação

1. Criar migrations:
   - Renomear colunas em português
   - Ajustar tipos de dados
   - Adicionar/remover constraints
   - Executar alterações estruturais

2. Atualizar models:
   - Estender BaseModel
   - Ajustar nomenclatura
   - Atualizar associações
   - Implementar validações centralizadas

3. Atualizar controllers e services:
   - Adaptar para novos nomes de campos
   - Implementar validações centralizadas
   - Atualizar tratamento de erros
   - Implementar middlewares de segurança

4. Atualizar testes:
   - Adaptar para nova estrutura
   - Adicionar casos para validações
   - Verificar integridade das associações
   - Testar fluxos completos

## 3. Detalhes Técnicos

### 3.1 Migrations Necessárias