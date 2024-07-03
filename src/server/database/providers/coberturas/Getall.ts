import { ETableNames } from '../../ETableNames';
import { ICoberturas } from '../../models';
import { Knex } from '../../knex';

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICoberturas[] | Error> => {
  try {
    const result = await Knex(ETableNames.coberturas)
      .select('*')
      .where('id', Number(id))
      .orWhere('titulo', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.length === 0) {
      const resultById = await Knex(ETableNames.coberturas)
        .select('*')
        .where('', '=', id)
        .first();

      if (resultById) return [resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};

