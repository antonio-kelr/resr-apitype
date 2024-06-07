"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
require("./shared/services/TransiationsYup");
const api_1 = __importDefault(require("./routes/api"));
const cidades_1 = __importDefault(require("./routes/cidades"));
const pessoas_1 = __importDefault(require("./routes/pessoas"));
const agendas_1 = __importDefault(require("./routes/agendas"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const classificados_1 = __importDefault(require("./routes/classificados"));
const cors_1 = __importDefault(require("cors"));
const server = (0, express_1.default)();
exports.server = server;
server.use(express_1.default.json());
const corsOptions = {
    origin: 'http://localhost:3000', // Substitua pelo domínio que você deseja permitir
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
};
server.use((0, cors_1.default)(corsOptions));
server.use('/', api_1.default);
server.use('/cidades', cidades_1.default);
server.use('/pessoas', pessoas_1.default);
server.use('/agendas', agendas_1.default);
server.use('/usuarios', usuarios_1.default);
server.use('/classificados', classificados_1.default);
