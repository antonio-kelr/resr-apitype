import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IClassificados } from "../../database/models";
import { UpdateClassificados } from "../../database/providers/classificados/Update";

interface IParamProps {
  id?: number;
}
interface IBodyProps extends Omit<IClassificados, "id" | "classificadoImg"> {}
export const UpdateClassificado = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      titulo: yup.string().required().min(3).max(150),
      descricao: yup.string().required().min(3).max(150),
      preco: yup.number().required(),
      telefone: yup.string().required().min(3).max(15),
      email: yup.string().required().email(),
      cidade: yup.string().required().min(3).max(150),
      estado: yup.string().required().min(2).max(2),
      categoria: yup.number().required(),
      data: yup.date(),
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
  const result = await UpdateClassificados(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send(result);
};
