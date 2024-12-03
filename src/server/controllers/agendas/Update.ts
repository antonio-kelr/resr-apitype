import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IAgenda } from "../../database/models";
import { AgendaProvader } from "../../database/providers/agendas";
import { generateSlug } from "../slug/slug";

interface IParamProps {
  id?: number;
}
interface IBodyProps extends Omit<IAgenda, 'id' | 'slug'> {
  slug?: string; // O slug pode ser opcional aqui

}
export const updateAgenda = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(3).max(150),
      data: yup.date().required(),
      descricao: yup.string().required().min(3).max(150),
      url: yup.string().url().optional(),
      slug: yup.string().optional(), // Incluindo o slug como opcional


    })
  ),
  params: getSchema<IParamProps>(
    yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })
  ),
}));

export const update = async (
  req: Request<IParamProps, {}, IBodyProps>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  }
    // Gerar novo slug a partir do título atualizado
    const slug = generateSlug(req.body.nome);
    req.body.slug = slug; // Adiciona o novo slug ao corpo da requisição
  
  
  const result = await AgendaProvader.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send(result);
};
