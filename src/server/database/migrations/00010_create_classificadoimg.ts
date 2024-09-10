import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.classificadoimgs, table => {
    table.bigIncrements('id').primary().index();
    table.string('titulo').index().notNullable();
    table.string('url').notNullable();

    table.bigInteger('classificado_id').unsigned().index();
    table.foreign('classificado_id').references('id').inTable(ETableNames.classificados).onDelete('CASCADE');

    table.comment('Tabela usada para armazenar imagens de coberturas.');
  }).then(() => {
    console.log(`# Created table ${ETableNames.classificadoimgs}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.classificadoimgs).then(() => {
    console.log(`# Dropped table ${ETableNames.classificadoimgs}`);
  });
}


