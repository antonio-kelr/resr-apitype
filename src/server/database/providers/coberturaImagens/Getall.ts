import { ETableNames } from '../../ETableNames';
import { ICoberturasImagens } from '../../models';
import { Knex } from '../../knex';


export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<ICoberturasImagens[] | Error> => {
  try {
    const result = await Knex(ETableNames.coberturaimagens)
      .select('*')
      .where('id', Number(id))
      .orWhere('titulo', 'like', `%${filter}%`)
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0 && result.every(item => item.id !== id)) {
      const resultById = await Knex(ETableNames.coberturaimagens)
        .select('*')
        .where('id', '=', id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};