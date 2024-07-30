import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.recados, table => {
    table.bigIncrements('id').primary().index();
    table.string('nome').notNullable().checkLength('>', 5);
    table.string('telefone').notNullable();
    table.string('email').index().unique().notNullable().checkLength('>', 6);
    table.string('mensagem').notNullable();

    table.bigInteger('usuario_id').unsigned().index();
    table.foreign('usuario_id').references('id').inTable(ETableNames.usuario).onDelete('CASCADE');

    table.comment('Tabela usada para armazenar imagens de coberturas.');
  }).then(() => {
    console.log(`# Created table ${ETableNames.recados}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.recados).then(() => {
    console.log(`# Dropped table ${ETableNames.recados}`);
  });
}


