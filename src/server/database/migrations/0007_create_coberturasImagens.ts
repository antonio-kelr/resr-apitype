import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.coberturaimagens, table => {
    table.bigIncrements('id').primary().index();
    table.string('titulo').index().notNullable();
    table.string('url').notNullable();

    // 'cobertura_id' e ajustado para unsigned e referenciando 'id' de 'coberturas'
    table.bigInteger('cobertura_id').unsigned().index();
    table.foreign('cobertura_id').references('id').inTable(ETableNames.coberturas).onDelete('CASCADE');

    table.comment('Tabela usada para armazenar imagens de coberturas.');
  }).then(() => {
    console.log(`# Created table ${ETableNames.coberturaimagens}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.coberturaimagens).then(() => {
    console.log(`# Dropped table ${ETableNames.coberturaimagens}`);
  });
}


