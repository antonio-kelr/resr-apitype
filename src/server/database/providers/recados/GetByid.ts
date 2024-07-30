import { ETableNames } from '../../ETableNames';
import { IRecados } from '../../models/recados';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<IRecados | Error> => {
  try {
    const result = await Knex(ETableNames.recados)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};