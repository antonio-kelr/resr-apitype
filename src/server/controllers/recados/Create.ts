import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IRecados } from '../../database/models/recados';
import { RecadosProvaider } from '../../database/providers/recados';

interface IBodyProps extends Omit<IRecados, 'id'> { }

export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(5).max(150),
    telefone: yup.string().required().min(11).max(12),
    email: yup.string().required().email(),
    mensagem: yup.string().required().min(10).max(150), 
    usuario_id: yup.number().required(), 

  })),
}));

export const Create = async (req: Request<{}, {}, IRecados>, res: Response) => {
  const result = await RecadosProvaider.create(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }


  return res.status(StatusCodes.CREATED).json(result);
  
};


