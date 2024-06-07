import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.classificados, table => {
    table.bigIncrements('id').primary().index();
    table.string('titulo',).index().notNullable();
    table.text('descricao').index().notNullable();
    table.date('preco').index().notNullable();
    table.date('telefone').index().notNullable();
    table.date('email').index().notNullable();
    table.date('cidade').index().notNullable();
    table.date('estado').index().notNullable();
    table.date('categoria').index().notNullable();
    table.date('data').index().notNullable();

    table.comment('Tabela usada para armazenar classificados.');
  }).then(() => {
    console.log(`# Created table ${ETableNames.classificados}`);
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTableIfExists(ETableNames.classificados).then(() => {
    console.log(`# Dropped table ${ETableNames.classificados}`);
  });
}
