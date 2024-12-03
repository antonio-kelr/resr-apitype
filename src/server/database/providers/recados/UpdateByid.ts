import { Knex } from "../../knex";
import { ETableNames } from "../../ETableNames";

interface IUpdateRecado {
  nome?: string;
  telefone?: string;
  email?: string;
  mensagem?: string;
  slug?:string;
  usuario_id?: number;
}

export const updateById  = async (id: number,updatedData: IUpdateRecado): Promise<void | Error> => {
  try {
    if (id <= 0) {
      return new Error("ID inválido");
    }

    await Knex(ETableNames.recados)
      .where("id", id)
      .update({
        nome: updatedData.nome,
        telefone: updatedData.telefone,
        email: updatedData.email,
        slug: updatedData.slug,
        mensagem: updatedData.mensagem,
        usuario_id: updatedData.usuario_id
      });

  } catch (error) {
    console.error(error);
    return new Error("Erro ao atualizar o recado");
  }
};





