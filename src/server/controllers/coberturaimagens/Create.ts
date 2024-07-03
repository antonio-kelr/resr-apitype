import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ICoberturasImagens } from '../../database/models/coberturaImagens';
import { CoberturaImagensProvider } from '../../database/providers/coberturaImagens';


interface IBodyProps extends Omit<ICoberturasImagens, 'id'> { }
export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    titulo: yup.string().required().min(3).max(150),
    url: yup.string().url().required(),

  })),
}));

export const Create = async (req: Request<{}, {}, ICoberturasImagens>, res: Response) => {
  const result = await CoberturaImagensProvider.create(req.body);

  console.log(req.file);
  

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);};

