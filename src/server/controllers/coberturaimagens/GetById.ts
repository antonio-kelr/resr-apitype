import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { CoberturaImagensProvider } from '../../database/providers/coberturaImagens';


interface IQueryProps {
  id?: number
}
export const GetByIdAgenda = validation((getSchema) => ({
  params: getSchema<IQueryProps>(yup.object().shape({
    id: yup.number().integer().optional().moreThan(0),
  })),
}));

export const getById = async (req: Request<IQueryProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }
  const result = await CoberturaImagensProvider.getById(req.params.id);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.OK).json(result);
};