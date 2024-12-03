import { ETableNames } from '../../ETableNames';
import { Ianucio } from '../../models/anucio';
import { Knex } from '../../knex';


export const updateById = async (id: number, anucio: Omit<Ianucio, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.anucio)
      .update(anucio)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};