import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IPessoa } from '../../database/models/Pessoa';
import { PessoasProvider } from '../../database/providers/pessoas';


interface IBodyProps extends Omit<IPessoa, 'id'> {}
export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nomeCompleto: yup.string().required().min(3),
    email: yup.string().required().email(),
    cidadeId: yup.number().integer().required().min(1),
  })),
}));

export const create = async (req: Request<{}, {}, IPessoa>, res: Response) => {
  const result = await PessoasProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);};

