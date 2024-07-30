import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { ICoberturas } from '../../database/models/Coberturas';
import { CoberturaProvaider } from '../../database/providers/coberturas';

interface IBodyProps extends Omit<ICoberturas, 'id'> { }

export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    titulo: yup.string().required().min(3).max(150),
    data: yup.date().required(),
    descricao: yup.string().required().min(3).max(150),

  })),
}));

export const Create = async (req: Request<{}, {}, ICoberturas>, res: Response) => {
  req.body.data = new Date(req.body.data);
  const result = await CoberturaProvaider.create(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
  
};

