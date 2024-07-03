import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICoberturasImagens } from '../../models';


export const create = async (coberturaImg: Omit<ICoberturasImagens, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.coberturaimagens).insert(coberturaImg).returning('id');

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