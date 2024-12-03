import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';


interface IUpdateNoticia {
  url?: string;
}

export const updateById = async (id: number, updates: IUpdateNoticia): Promise<void | Error> => {
  try {
    if (Object.keys(updates).length === 0) {
      return new Error('Nenhum campo para atualizar');
    }

    const result = await Knex(ETableNames.noticias)
      .update(updates)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};
