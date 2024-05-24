# API IFOOD Social

Api Rest com NodeJs Express MySQL para o módulo de organizar cardápio do projeto IFOOD Social da disciplina de Eng. Software.

## Instalação Manual

Clonar o repositório:

```bash
git clone https://github.com/matheusssilva991/Ifood-social
cd ifood-social-back
```

Instalar as dependências:

```bash
npm install
```

Definir as variáveis de ambiente:

```bash
cp .env.example .env
# Abra .env e modifique as variáveis de ambiente
```

## Tabela de conteúdos

- [Comandos](#comandos)
- [Variáveis de ambiente](#variaveis-de-ambiente)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)

## Comandos

Rodar em desenvolvimento:

```bash
npm start
```

## Variaveis de ambiente

```bash
# Host do banco de dados MySQL
MYSQL_HOST = "localhost"

# Porta do banco de dados
MYSQL_PORT = '3306'

# Nome do usuário do banco de dados
MYSQL_USER = 'root'

# Senha do usuário do banco
MYSQL_PASSWORD = 'password'

# Senha do root (opcional, apenas para o docker)
MYSQL_ROOT_PASSWORD = 'password'

# Nome do banco de dados utilizado
MYSQL_DATABASE = 'IFOODSOCIAL'

# Porta da Aplicação
PORT = 8080
```

## Estrutura do projeto

```text
 |--dev_files              # Arquivos utilizados no desenvolvimento
 |--|--src\controllers\    # Arquivos de definição dos Endpoints
 |--|--src\models\         # Arquivos de funções de acesso ao banco de dados
 |--|--src\services\       # Arquivos com regras de negócio da aplicação
 |--|--src\routes\         # Arquivo de junção das rotas da aplicação
 |--|--src\database\       # Arquivos de conexão e configuração do banco de dados
 |--|--src\app.js          # App raiz da aplicação
```

## Endpoints da API

**Cardapio**:\
`GET /api/cardapios` - Pegar todos os cardápios\
`GET /api/cardapio/:id` - Pegar um cardápio pelo id\
`POST /api/cardapio` - Cadastrar um novo cardápio\
`PUT /api/cardapio/:id` - Atualizar um cardápio\
`DELETE cardapio/:id` - Deletar um cardápio

**Seção**:\
`GET /api/secoes` - Pegar todas as seções\
`GET /api/secao/:id` - Pegar uma seção pelo id\
`POST /api/secao` - Cadastrar uma nova seção\
`PUT /api/secao/:id` - Atualizar uma seção\
`DELETE /api/secao/:id` - Deletar uma seção

**Seção Produtos**:\
`GET /api/secoes-produtos` - Pegar todas as seções de produtos\
`GET /api/secao-produto/:id` - Pegar uma seção de produto pelo id\
`POST /api/secao-produto` - Cadastrar uma nova seção de produto\
`PUT /api/secao-produto/:id` - Atualizar uma seção de produto\
`DELETE /api/secao-produto/:id` - Deletar uma seção de produto

**Empreendimento**:\
`GET /api/empreendimentos` - Pegar todos os empreendimentos\
`GET /api/empreendimento/:id` - Pegar um empreendimento pelo id\

**Produto**:\
`GET /api/produtos` - Pegar todos os produtos\
`GET /api/produto/:id` - Pegar um produto pelo id\
