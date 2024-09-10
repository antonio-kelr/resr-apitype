import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IclassificaImgs } from '../../database/models/classificadosImg';
import { ClassificadoProvider } from '../../database/providers/classcificadosImg';

interface IBodyProps extends Omit<IclassificaImgs, 'id'> { }

export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    titulo: yup.string().required().min(3).max(150),
    url: yup.string().url().required(),
    classificado_id: yup.number().required()

  })),
})); 

export const Create = async (req: Request<{}, {}, IclassificaImgs>, res: Response) => {
  const result = await ClassificadoProvider.create(req.body);

  console.log('dados aqui_1', result);
  console.log('dados aqui_2', req.body);
  

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
};
  