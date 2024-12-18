import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { INoticias } from "../../database/models";
import { NoticiasProvaider } from "../../database/providers/noticias";
import { generateSlug } from "../slug/slug";

interface IBodyProps extends Omit<INoticias, "id" | "slug"> {
  url?: string; // Tornar `url` opcional
}
export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      titulo: yup.string().required().min(3).max(150),
      data: yup.date().required(),
      descricao: yup.string().required(),
      url: yup.string().url().optional(),
    })
  ),
}));

export const Create = async (
  req: Request<{}, {}, INoticias>,
  res: Response
) => {
  req.body.data = new Date(req.body.data);
  const slug = (req.body.slug = generateSlug(req.body.titulo));
  console.log(slug);

  const result = await NoticiasProvaider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  console.log("dados aqui", req.body);

  return res.status(StatusCodes.CREATED).json(result);
};
