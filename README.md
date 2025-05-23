# 🖥️ node-clean-testing

Repositório de estudo e prática com foco em **testes unitários**, **integração** e **E2E**, utilizando **Node.js**, **TypeScript**, **Jest**, princípios **SOLID** e boas práticas de arquitetura como **DDD** e **Clean Architecture**.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** com TypeScript
- **Arquitetura Limpa (Clean Architecture)**
- **Domain-Driven Design (DDD)**
- **Princípios SOLID**
- **Jest** para testes unitários, de integração e e2e
- **class-validator** para validação de entidades
- **uuid** para geração de identificadores únicos
- **Express.js** na camada de interface HTTP
- **ESLint + Prettier** para código limpo e padronizado

---

## 🧱 Estrutura do Projeto

O projeto segue uma estrutura modular e escalável com responsabilidade bem definida em cada camada:

- `domain`: entidades e interfaces (ex: `User`, `IUserRepository`)
- `application`: casos de uso (ex: `CreateUser`, `DeleteUser`)
- `infrastructure`: repositórios e configs (ex: `InMemoryUserRepository`)
- `interfaces`: entrada/saída HTTP, controladores, rotas e middlewares
- `main`: inicialização da aplicação
- `shared`: classes e utilitários reutilizáveis (ex: `NotFoundError`)
- `tests`: testes unitários, integração e e2e com Jest

---

## ✅ Casos de Uso Implementados

- `CreateUser`: Criação de novo usuário com validações e verificação de email duplicado.
- `GetUserById`: Busca por usuário usando o ID.
- `ListUsers`: Lista todos os usuários cadastrados.
- `UpdateUser`: Atualiza dados de um usuário.
- `DeleteUser`: Remove um usuário existente.

---

## 🧍‍♂️ Entidade `User`

Entidade central do domínio da aplicação, com validações realizadas via `class-validator`.

### Propriedades:

- `id`: UUID (gerado automaticamente, se ausente)
- `name`: obrigatório, não vazio
- `email`: obrigatório, com formato válido

---

## 🧪 Testes Automatizados

A suíte de testes cobre diferentes camadas do sistema:

### 🔹 Testes Unitários

- Casos de uso
- Entidades
- Repositórios em memória

### 🔹 Testes de Integração

- Testes das rotas HTTP com Express

### 🔹 Testes de Fim a Fim (E2E)

- Simulação completa de fluxos da aplicação

### Executar testes:

```bash
npm install
npm test
```

## 📋 Requisitos

- Node.js >= 18.x
- npm ou yarn
- TypeScript

## 💡 Boas Práticas Aplicadas

- Separação de responsabilidades (SRP)
- Inversão de dependências via interfaces
- Repositório em memória para testes isolados
- Validações explícitas nas entidades
- Lint e formatação com ESLint + Prettier

Made with 💚 by [Eric Crozatti Ferreira](https://www.linkedin.com/in/eric-crozatti-1447688a/)
