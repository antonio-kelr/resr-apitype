"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.down = exports.up = void 0;
const ETableNames_1 = require("../ETableNames");
function up(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex
            .schema
            .createTable(ETableNames_1.ETableNames.pessoa, table => {
            table.bigIncrements('id').primary().index();
            table.string('nomeCompleto').index().notNullable();
            table.string('email').unique().notNullable();
            table.bigInteger('cidadeId')
                .index()
                .notNullable()
                .references('id')
                .inTable(ETableNames_1.ETableNames.cidade)
                .notNullable()
                .onUpdate('CASCADE')
                .onDelete('RESTRICT');
            table.comment('Tabela usada para armazenar.pessoas do sistema.');
        })
            .then(() => {
            console.log(`# Created table ${ETableNames_1.ETableNames.pessoa}`);
        });
    });
}
exports.up = up;
function down(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        return knex
            .schema
            .dropTable(ETableNames_1.ETableNames.pessoa)
            .then(() => {
            console.log(`# Dropped table ${ETableNames_1.ETableNames.pessoa}`);
        });
    });
}
exports.down = down;
