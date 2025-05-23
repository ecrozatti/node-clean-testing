# Projeto User Management

Este projeto é um exemplo de sistema para gerenciamento de usuários, utilizando TypeScript com arquitetura limpa (Clean Architecture), incluindo validações, repositórios e casos de uso.

## Tecnologias

- TypeScript
- Node.js
- Jest (testes)
- class-validator (validação de entidades)
- uuid (geração de IDs únicos)
- Arquitetura limpa com separação entre domain, application e infrastructure

## Estrutura do Projeto

- **domain**: contém as entidades e contratos (interfaces) dos repositórios.
- **application**: casos de uso da aplicação (ex: CreateUser).
- **infrastructure**: implementação dos repositórios (ex: InMemoryUserRepository).
- **tests**: testes unitários para casos de uso e repositórios.

## Entidades Principais

### User

A entidade `User` representa o usuário, com as propriedades:

- `id`: UUID gerado automaticamente ou recebido no construtor.
- `name`: string não vazia.
- `email`: string com formato válido de email.

Validações são feitas usando decorators do `class-validator`.

## Casos de Uso

### CreateUser

Caso de uso responsável por criar um usuário, garantindo:

- Validação dos dados do usuário.
- Checagem para evitar emails duplicados.
- Persistência do usuário no repositório.

## Repositórios

### IUserRepository

Interface que define métodos para manipulação de usuários, como:

- `findById(id: string): Promise<User | null>`
- `findByEmail(email: string): Promise<User | null>`
- `add(user: User): Promise<void>`

### InMemoryUserRepository

Implementação em memória para facilitar testes.

## Testes

Testes unitários com Jest cobrem:

- Criação de usuários válidos.
- Evitar duplicação de emails.
- Recuperação de usuários por id e email.
- Comportamento do repositório em memória.

## Como rodar os testes

```bash
npm install
npm test
