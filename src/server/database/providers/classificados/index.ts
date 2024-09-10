import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IClassificados } from "../../models/Classificados";

export const ClassificadosProvider = {
  async create(
    classificados: Omit<IClassificados, "id">
  ): Promise<IClassificados | Error> {
    try {
      const result = await Knex(ETableNames.classificados)
        .insert(classificados)
        .returning("*");

      if (Array.isArray(result) && result.length > 0) {
        return result[0] as IClassificados;
      }

      return new Error("Erro ao cadastrar o registro");
    } catch (error) {
      console.log(error);
      return new Error("Erro ao cadastrar o registro");
    }
  },


  async getAllCategorias() {
    return await Knex(ETableNames.categoria).select("*");
  },

  async DeleteAll(id: number): Promise<void | Error> {
    try {
      const result = await Knex(ETableNames.classificados)
        .where("id", id)
        .del();

      if (result === 0) {
        return new Error("Registro não encontrado");
      }
    } catch (error) {
      console.log(error);
      return new Error("Erro ao deletar o registro");
    }
  },
};
