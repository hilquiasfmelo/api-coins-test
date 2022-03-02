
# API Coins Test

Aplicação desenvolvida toda em TypeScript, utilizando conceitos como SOLID, DDD,
DTO e Migrations


## Stack utilizada

**Back-end:** Node, TypeScript, Express, Docker, Eslint, Prettier, Postgres, TypeORM, Tsyringe, JWT, BCryptjs


## Instalação

#### Configurar um container Docker e deve-se criar um Banco de Dados
#### No arquivo .env.example renomeá-lo para .env e adicionar as informações em vazio:

```bash
  # Server
SERVER_PORT=

# JWT
JWT_SECRET=
JWT_EXPIRES=

# TypeORM
TYPEORM_CONNECTION =
TYPEORM_PORT =
TYPEORM_HOST =
TYPEORM_USERNAME =
TYPEORM_PASSWORD =
TYPEORM_DATABASE =
TYPEORM_MIGRATIONS = src/shared/infra/typeorm/migrations/*.ts
TYPEORM_ENTITIES = src/modules/**/entities/*.ts
TYPEORM_MIGRATIONS_DIR = src/shared/infra/typeorm/migrations

```
#### OBS: Toda conexão do TypeORM foi feita com Variáveis de Ambiente
## Estrutura da Aplicação

###### A mesma se divide em 3 partes principais:
* **modules** = Aqui está todas as entidades e casos de usos separados cada qual com sua funcionalidade específica
    ***
* **shared** = Nessa parte estão tudo que é compartilhado com a aplicação como rotas, middlewares globais como também o arquivo principal.
***
## Executando a Aplicação
#### Primeiro rodar as migrations:
```bash
yarn typeorm migration:run
```
***
#### Logo após a aplicação em si:
```bash
yarn dev:server
```
## Autores
👩‍💻 | Hilquias Ferreira Melo
***
📧 | hilquiasfmelo@hotmail.com
***
📲  | (98) 98329-1170
***
🌐 | https://github.com/hilquiasfmelo

- Link do Repositório dessa API [@hilquiasfmelo](https://github.com/hilquiasfmelo/api-coins-test.git)

