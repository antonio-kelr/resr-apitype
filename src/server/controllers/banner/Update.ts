import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { Ibanner } from "../../database/models";
import { BannerProvader } from "../../database/providers/banner";

interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<Ibanner, "id" | "titulo" | "categoria"> {}


export const updateAgenda = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      url: yup.string().url().optional(),
      userId: yup.number().required(),

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

  const result = await BannerProvader.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send(result);
};
