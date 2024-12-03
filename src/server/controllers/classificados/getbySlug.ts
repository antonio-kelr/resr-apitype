import { Request, Response } from "express";
import * as yup from "yup";

import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import {getBySLug} from '../../database/providers/classificados/GetBySlug'

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
export const getBySlug = async (req: Request<IQueryProps>, res: Response) => {
  if (!req.params.slug) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "slug" precisa ser informado.',
      },
    });
  }
  const result = await getBySLug(req.params.slug);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
