"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.production = exports.test = exports.development = void 0;
const path_1 = __importDefault(require("path"));
exports.development = {
    client: 'pg',
    useNullAsDefault: true,
    connection: {
        host: String(process.env.DATABASE_HOST || "localhost"),
        user: String(process.env.DATABASE_USER || "postgres"),
        database: String(process.env.DATABASE_NAME || "postgres"),
        password: String(process.env.DATABASE_PASSWORD || "root"),
        port: Number(process.env.DATABASE_PORT || 5432),
        ssl: false, // Desabilitar SSL
    },
    migrations: {
        directory: path_1.default.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path_1.default.resolve(__dirname, '..', 'seeds'),
    },
    pool: {
        min: 1,
        max: 10
    }
};
exports.test = Object.assign({ connection: ':memory:' }, exports.development);
exports.production = {
    client: 'pg',
    migrations: {
        directory: path_1.default.resolve(__dirname, '..', 'migrations'),
    },
    seeds: {
        directory: path_1.default.resolve(__dirname, '..', 'seeds'),
    },
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
        password: process.env.DATABASE_PASSWORD,
        port: Number(process.env.DATABASE_PORT || 5432),
        ssl: false, // Desabilitar SSL
    },
};
