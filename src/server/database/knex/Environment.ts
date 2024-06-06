import { Knex } from 'knex';
import path from 'path';


export const development: Knex.Config = {
  client: 'pg',
  useNullAsDefault: true,
  connection: {
    host: String(process.env.DATABASE_HOST ||"localhost"),
    user: String(process.env.DATABASE_USER ||"postgres"),
    database: String(process.env.DATABASE_NAME || "api-node"),
    password: String(process.env.DATABASE_PASSWORD || "Lorim513021",),
    port: Number(process.env.DATABASE_PORT || 5432),
    ssl: false,  // Desabilitar SSL
  },
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  pool: {
    min: 1,
    max: 10
  }
};

export const test: Knex.Config = {
  connection: ':memory:',
  ...development
};

export const production: Knex.Config = {
  client: 'pg',
  migrations: {
    directory: path.resolve(__dirname, '..', 'migrations'),
  },
  seeds: {
    directory: path.resolve(__dirname, '..', 'seeds'),
  },
  connection: {
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT || 5432),
    ssl: false,  // Desabilitar SSL
  },
};