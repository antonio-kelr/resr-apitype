import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { ICoberturas } from '../../models';



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
        .where('id', '=', id)
        .first();

      if (resultById) {
        const imagens = await Knex(ETableNames.coberturaimagens)
          .select('*')
          .where('cobertura_id', '=', resultById.id);
        resultById.coberturaImg = imagens;
        return [resultById];
      }
    } else {
      for (const cobertura of result) {
        const imagens = await Knex(ETableNames.coberturaimagens)
          .select('*')
          .where('cobertura_id', '=', cobertura.id);


        cobertura.coberturaImg = imagens;
      }
    }

    return result;
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar os registros');
  }
};
