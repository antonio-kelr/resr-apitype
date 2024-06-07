import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IClassificados } from "../../models/Classificados";


export const ClassificadosProvider = {

  async create(classificados: Omit<IClassificados, 'id'>): Promise<IClassificados | Error> {
    try {
      console.log(classificados);
      const result = (await Knex(ETableNames.classificados).insert(classificados)).find((item) => item);
      console.log(result);

      if (typeof result === 'object') {
        return result;
      }

      return new Error('Erro ao cadastrar o registro');
    } catch (error) {
      return new Error('Erro ao cadastrar o registro');
    }
  }
};