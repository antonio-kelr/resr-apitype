import { ETableNames } from '../../ETableNames';
import { IClassificados } from '../../models';
import { Knex } from '../../knex';


export const getBySLug = async (slug: string): Promise<IClassificados | Error> => {
  try {
    const result = await Knex(ETableNames.classificados)
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