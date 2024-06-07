import { Knex } from 'knex';
import { ETableNames } from '../ETableNames';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.classificados, table => {
    table.bigIncrements('id').primary().index();
    table.string('titulo',).index().notNullable();
    table.text('descricao').index().notNullable();
    table.decimal('preco').index().notNullable();
    table.text('telefone').index().notNullable();
    table.text('email').index().notNullable();
    table.text('cidade').index().notNullable();
    table.text('estado').index().notNullable();
    table.bigint('categoria').index().notNullable();
    table.date('data').index().notNullable();
    table.boolean('ativo').index().notNullable().defaultTo(false);

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
