import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.banner, table => {
    table.bigIncrements('id').primary().index();
    table.string('titulo').index().notNullable();
    table.string('url').notNullable();
    table.bigint('categoria').index().notNullable();



    table.comment('Tabela usada para armazenar imagens de coberturas.');
  }).then(() => {
    console.log(`# Created table ${ETableNames.banner}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.banner).then(() => {
    console.log(`# Dropped table ${ETableNames.banner}`);
  });
}

