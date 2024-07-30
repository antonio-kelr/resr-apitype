import { IRecados } from '../../models/recados';
import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


export const create = async (recados: Omit<IRecados, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.recados).insert(recados).returning('id');

    if (typeof result === 'object') {
      return result.id;
      

    } else if (typeof result === 'number') {
      return result;
    }

    return new Error('Erro ao cadastrar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao cadastrar o registro');
  }
};

