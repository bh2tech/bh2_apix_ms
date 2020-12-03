# API - APIX File (Gerar os arquivos APIX001 e APIX002)

## Description

O objetivo deste repositório é oferecer um meio de auxiliar os desenvolvedores das instituições na geração dos arquivos **APIX001** e **APIX002**. Devem ser enviadas nestes arquivos informações do Arranjo de Pagamentos Pix definidas pela Instrução Normativa nº 32, de 26 de outubro de 2020. 

**Material de apoio:**

- [Remessa de Informações Relativas ao Arranjo de Pagamento Pix](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Remessa_informacoes_Pix/Informacoes_Pix_sob_demanda.pdf)
- [Layout do Arquivo](https://www.bcb.gov.br/content/estabilidadefinanceira/pix/Remessa_informacoes_Pix/APIX001.xlsx) 

**A API contém duas rotas principais:**

- **/api/arquivos** => Geração do arquivo a partir de um payload em JSON que devolve o XML.
- **/api/arquivos/upload-csv** => Geração do arquivo a partir de um CSV customizado, este CSV permite uma extração simples das informações de bases de dados para gerar o XML. Arquivo de demonstração em [src/files](https://github.com/bh2tech/bh2_apix_ms/tree/master/src/files).

API - Stack:

- [TypeScript](https://www.typescriptlang.org/).
- [Node.js](https://nodejs.org/).
- [Hapi](https://hapi.dev/).
- [Hapi-swagger](https://github.com/glennjones/hapi-swagger).
- [XHelpers-api 2.+](https://www.npmjs.com/package/xhelpers-api).
- [Docker](https://www.docker.com/).

## State

|            |           |
| ---------- | --------- |
| Develop    | [pending] |
| Homolog    | [pending] |
| Production | [pending] |

## Installation

```bash
$ npm install
```

## Configuration

API configuration on .env file.

DEVS: Create .env file on root folder.

```bash
# server params
NODE_ENV=dev
LOG_LEVEL=HIGH
PORT=300
HOST=localhost
SSL=false

```

## Running the app

```bash
# build tsc
$ npm run build

# development 
$ npm run dev

# development (only windows)
$ npm run devw

# production
$ npm run start
```

#### Routes

```code
Starting Xhelpers Hapi server API
Settings API: Mongoose disabled;
Settings API: Sequelize disabled;
Settings API: SSL disabled;
Settings API: AppKey disabled;
Settings API: JWT enabled;
Settings API: SSO disabled;
====================================================================================================
🆙  Server api    : http://localhost:300/
🆙  Server doc    : http://localhost:300/documentation
🆙  Server status : http://localhost:300/status
====================================================================================================
Routing table:
        🔎  get -       /documentation
        🔎  get -       /health
        🔎  get -       /status
        🔎  get -       /swagger.json
        🔎  get -       /api/arquivos/demo
        🔎  get -       /api/arquivos/schema
        📄  post -      /api/arquivos/upload-csv
        📄  post -      /api/arquivos/
```

## Cloud (AWS/Azure/GCP)

```
DEMO:
```

## Docker build

```bash
$ api-apix
```

## Test

[Pending]

## Support

[Pending]

## Stay in touch

- Author - [bh2](https://github.com/orgs/bh2tech)
- Website - [bh2.com.br](https://bh2.com.br)

## License

[MIT License](https://github.com/bh2tech/bh2_apix_ms/blob/master/LICENSE)