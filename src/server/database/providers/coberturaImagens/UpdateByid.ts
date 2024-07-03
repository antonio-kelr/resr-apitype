import { ETableNames } from '../../ETableNames';
import { ICoberturasImagens} from '../../models/coberturaImagens';
import { Knex } from '../../knex';


export const updateById = async (id: number, agenda: Omit<ICoberturasImagens, 'id'>): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.coberturaimagens)
      .update(agenda)
      .where('id', '=', id);

    if (result > 0) return;

    return new Error('Erro ao atualizar o registro');
  } catch (error) {
    console.log(error);
    return new Error('Erro ao atualizar o registro');
  }
};