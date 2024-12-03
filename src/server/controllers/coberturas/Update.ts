import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { ICoberturas } from "../../database/models/Coberturas";
import { CoberturaProvaider } from "../../database/providers/coberturas";
import { generateSlug } from '../slug/slug';  // Certifique-se de que o caminho está correto

interface IParamProps {
  id?: number;
}

// Incluindo o slug na interface IBodyProps
interface IBodyProps extends Omit<ICoberturas, 'id'> {
  slug?: string; // O slug pode ser opcional aqui
}

export const updateAgenda = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      titulo: yup.string().required().min(3).max(150),
      data: yup.date().required(),
      local: yup.string().required().min(3).max(20),
      fotografo: yup.string().required().min(3).max(20),
  
      descricao: yup.string().required().min(3).max(150),
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
  const slug = generateSlug(req.body.titulo);
  req.body.slug = slug; // Adiciona o novo slug ao corpo da requisição

  const result = await CoberturaProvaider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send(result);
};
