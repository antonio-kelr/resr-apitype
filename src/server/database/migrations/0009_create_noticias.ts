import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.noticias, table => {
    table.bigIncrements('id').primary().index();
    table.string('titulo', ).index().notNullable();
    table.date('data').index().notNullable();
    table.text('descricao').index().notNullable();
    table.string('url').notNullable();


    table.comment('Tabela usada para armazenar entradas na agenda.');
  }).then(() => {
    console.log(`# Created table ${ETableNames.noticias}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.noticias).then(() => {
    console.log(`# Dropped table ${ETableNames.noticias}`);
  });
}

