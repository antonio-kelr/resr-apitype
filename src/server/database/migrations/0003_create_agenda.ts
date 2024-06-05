import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.agenda, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome', ).index().notNullable();
    table.date('data').index().notNullable();
    table.text('descricao').index().notNullable();

    table.comment('Tabela usada para armazenar entradas na agenda.');
  }).then(() => {
    console.log(`# Created table ${ETableNames.agenda}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.agenda).then(() => {
    console.log(`# Dropped table ${ETableNames.agenda}`);
  });
}

