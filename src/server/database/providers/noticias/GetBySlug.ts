import { ETableNames } from '../../ETableNames';
import { INoticias } from '../../models';
import { Knex } from '../../knex';


export const getBySlug = async (slug: string): Promise<INoticias | Error> => {
  try {
    const result = await Knex(ETableNames.noticias)
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