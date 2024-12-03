import { ETableNames } from '../../ETableNames';
import { Ibanner } from '../../models';
import { Knex } from '../../knex';


export const updateById = async (id: number, banner: Omit<Ibanner, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.banner)
      .update(banner)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};