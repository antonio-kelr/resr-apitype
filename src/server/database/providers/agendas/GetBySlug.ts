import { ETableNames } from '../../ETableNames';
import { IAgenda } from '../../models';
import { Knex } from '../../knex';


export const getBySlug = async (slug: string): Promise<IAgenda | Error> => {
  try {
    const result = await Knex(ETableNames.agenda)
      .select('*')
      .where('slug', '=', slug)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};