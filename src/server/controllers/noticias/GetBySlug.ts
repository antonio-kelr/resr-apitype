import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { NoticiasProvaider } from '../../database/providers/noticias';

interface IQueryProps {
  slug?: string; 
}

export const GetBySlugValidation = validation((getSchema) => ({
  params: getSchema<IQueryProps>(
    yup.object().shape({
      slug: yup.string().optional(), 
    })
  ),
}));
export const getBySlugnoticia = async (req: Request<IQueryProps>, res: Response) => {
  if (!req.params.slug) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "slug" precisa ser informado.',
      },
    });
  }
  const result = await NoticiasProvaider.getBySlug(req.params.slug);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
