import { Knex } from "knex";

import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.usuario, (table) => {
      table.bigIncrements("id").primary().index();
      table.string("nome").notNullable().checkLength(">", 3);
      table.string("email").index().unique().notNullable().checkLength(">", 6);
      table.string("senha").checkLength(">=", 6);

      table.bigInteger("recado_id").unsigned().index();
      table
        .foreign("recado_id")
        .references("id")
        .inTable(ETableNames.recados)
        .onDelete("CASCADE");

      table.comment("Tabela usada para armazenar.usuarios do sistema.");
    })
    .then(() => {
      console.log(`# Created table ${ETableNames.usuario}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.usuario).then(() => {
    console.log(`# Dropped table ${ETableNames.usuario}`);
  });
}
