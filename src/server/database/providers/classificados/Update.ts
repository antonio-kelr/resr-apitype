import { ETableNames } from "../../ETableNames";
import { IClassificados } from "../../models";
import { Knex } from "../../knex";

export const UpdateClassificados = async (
  id: number,
  agenda: Omit<IClassificados, "id">
): Promise<void | Error> => {
  try {
    const result = await Knex(ETableNames.classificados)
      .update(agenda)
      .where("id", "=", id);

    if (result > 0) return;

    return new Error("Erro ao atualizar o registro");
  } catch (error) {
    console.log(error);
    return new Error("Erro ao atualizar o registro");
  }
};
