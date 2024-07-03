import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.coberturas, table => {
    table.bigIncrements('id').primary().index();
    table.string('titulo').index().notNullable();
    table.date('data').index().notNullable();
    table.text('descricao').notNullable();

    table.comment('Tabela usada para armazenar coberturas.');
  }).then(() => {
    console.log(`# Created table ${ETableNames.coberturas}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.coberturas).then(() => {
    console.log(`# Dropped table ${ETableNames.coberturas}`);
  });
}
