import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { INoticias } from '../../models';


export const create = async (noticia: Omit<INoticias, 'id'>): Promise<number | Error> => {
  try {
    const [result] = await Knex(ETableNames.noticias).insert(noticia).returning('id');

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