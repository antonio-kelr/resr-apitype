import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IClassificados } from "../../models/Classificados";


export const ClassificadosProvider = {

  async create(classificados: Omit<IClassificados, 'id'>): Promise<IClassificados | Error> {
    try {
      const result = await Knex(ETableNames.classificados).insert(classificados).returning('*')

      if (typeof result === 'object') {
        return result[0] as IClassificados;
      }

      return new Error('Erro ao cadastrar o registro');
    } catch (error) {
      console.log(error);
      return new Error('Erro ao cadastrar o registro');
    }
  },

  async getAll() {
    return await Knex(ETableNames.classificados).select('*');
  },

  async getAllCategorias() {
    return await Knex(ETableNames.categoria).select('*');
  }
};