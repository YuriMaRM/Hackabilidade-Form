// Dependências
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import { dirname } from "path";
import { fileURLToPath } from "url";

// Helpers
import log from "./helpers/log.js";

// Rotas
import routes from "./routes/index.js";

// Configurando .env
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: `${__dirname}/../.env` });

// Importando valores do .env
const apiPort = process.env.PORTA_API;

let options = {};
let protocol;

// Definindo protocolo Http
protocol = http;

const app = express();
const server = protocol.createServer(options, app);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, limit: 1511620 }));


// Sempre dá log no request feito
app.use((req, res, next) => { log.magenta(`REQUEST: ${req.method} ${req.url} BY ${req.ip}`); next(); });

// Ativnado as rotas
routes.forEach(route => app.use(route));

server.listen(apiPort, () => log.green(`API Está Rodando na porta ${apiPort}.`));