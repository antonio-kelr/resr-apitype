import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.categoria, table => {
    table.bigIncrements('id').primary().index();
    table.string('titulo',).index().notNullable();
    table.text('slug').index().notNullable();

    table.comment('Tabela usada para armazenar categoria.');
  }).then(() => {
    console.log(`# Created table ${ETableNames.categoria}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.categoria).then(() => {
    console.log(`# Dropped table ${ETableNames.categoria}`);
  });
}
  