import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { Ibanner } from "../../database/models";
import { BannerProvader } from "../../database/providers/banner";

interface IBodyProps extends Omit<Ibanner, "id" | "titulo"> {}
export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      url: yup.string().url().optional(),
      categoria: yup.number().required(),
      userId: yup.number().required(),

    })
  ),
}));

export const Create = async (req: Request<{}, {}, Ibanner>, res: Response) => {
  const result = await BannerProvader.create(req.body);

  console.log('titulo aqui',req.body.titulo);
  

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
};
