import { IClassificados } from "./../../models";
import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

interface Iclassificado {
  id: number;
  classificado_id: number;
}

interface IclassificadosWith extends IClassificados {
  classificadoImg?: Iclassificado[];
}

export const getAllClassificado = async (
  page: number,
  limit: number,
  filter: string,
  id = 0,
  targetClassificadoId?: number
): Promise<IclassificadosWith[] | Error> => {
  try {
    let query = Knex(ETableNames.classificados)
      .select("*")
      .offset((page - 1) * limit)
      .limit(limit);

    if (id > 0) {
      query = query.where("id", "=", id);
    } else if (filter) {
      query = query.orWhere("titulo", "like", `%${filter}%`);
    }

    const result = await query;

    if (id > 0 && result.length === 0) {
      return new Error("classificado_id não encontrado");
    }

    const classificaImgId = result.map((user) => user.id);

    let classificadoQuery = Knex(ETableNames.classificadoimgs)
      .select("*")
      .whereIn("classificado_id", classificaImgId);

    if (targetClassificadoId) {
      classificadoQuery = classificadoQuery.andWhere("classificado_id", targetClassificadoId);
    }

    const classificado = await classificadoQuery;

    const resultWithRecados = result.map((user) => {
      const classificadoImg = classificado.filter(
        (img) => img.classificado_id === user.id
      );

      return {
        ...user,
        classificadoImg: classificadoImg.length > 0 ? classificadoImg : undefined,
      };
    });

    return resultWithRecados;
  } catch (error) {
    console.error(error);
    return new Error("Erro ao consultar os registros");
  }
};
