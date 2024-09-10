import { IRecados } from "./../../models/recados";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

interface IRecado {
  id: number;
  recado_id: number;
}

interface IRecadosWithRecados extends IRecados {
  usarioRec?: IRecado[];
}

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = 0
): Promise<IRecadosWithRecados[] | Error> => {
  try {
    let query = Knex(ETableNames.recados)
      .select("*")
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0) {
      query = query.where("id", "=", id);
    } else if (filter) {
      query = query.orWhere("nome", "like", `%${filter}%`);
    }

    const result = await query;

    if (id > 0 && result.length === 0) {
      return new Error("Usuário não encontrado");
    }
    const userIds = result.map((user) => user.id);
    const recados = await Knex(ETableNames.usuario)
      .select("*")
      .whereIn("recado_id", userIds);

    const resultWithRecados = result.map((user) => {
      const userRecados = recados.filter(
        (recado) => recado.recado_id === user.id
      );
      return {
        ...user,
        usuarioRec: userRecados,
      };
    });

    return resultWithRecados;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar os registros");
  }
};
