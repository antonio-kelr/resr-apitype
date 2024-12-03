import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { Ianucio, Ibanner } from "../../database/models";
import { AnucioProvader } from "../../database/providers/anucio";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<Ianucio, "id" | "titulo" | "categoria"> {}


export const updateAgenda = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      url: yup.string().url().optional(),

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

  const result = await AnucioProvader.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send(result);
};
