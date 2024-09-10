import { ETableNames } from '../../ETableNames';
import { IclassificaImgs} from '../../models/classificadosImg';
import { Knex } from '../../knex';


export const updateById = async (id: number, classificadoImg: Omit<IclassificaImgs, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.classificadoimgs)
      .update(classificadoImg)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};