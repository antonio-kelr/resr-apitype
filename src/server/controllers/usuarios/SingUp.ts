import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IUsuario } from '../../database/models';
import { UsuarioProvader } from '../../database/providers/usuarios';


interface IBodyProps extends Omit<IUsuario, 'id'> { }
export const singUpValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3),
    email: yup.string().required().email().min(6),
    senha: yup.string().required().min(6),
    recado_id: yup.number().required()
  })),
}));

export const SigUp = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const result = await UsuarioProvader.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};

