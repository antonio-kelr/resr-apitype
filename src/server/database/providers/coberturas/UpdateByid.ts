import { ETableNames } from '../../ETableNames';
import { ICoberturas} from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, agenda: Omit<ICoberturas, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.coberturas)
      .update(agenda)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};