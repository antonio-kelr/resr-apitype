import { ETableNames } from '../../ETableNames';
import { IclassificaImgs } from '../../models/classificadosImg';
import { Knex } from '../../knex';


export const getById = async (id: number): Promise<IclassificaImgs | Error> => {
  try {
    const result = await Knex(ETableNames.classificadoimgs)
      .select('*')
      .where('id', '=', id)
      .first();

    if (result) return result;

    return new Error('Registro não encontrado');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao consultar o registro');
  }
};