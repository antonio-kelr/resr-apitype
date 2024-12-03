import { ETableNames } from '../../ETableNames';
import { IRecados } from '../../models/recados';
import { Knex } from '../../knex';


export const getBySlug = async (slug: string): Promise<IRecados | Error> => {
  try {
    const result = await Knex(ETableNames.recados)
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