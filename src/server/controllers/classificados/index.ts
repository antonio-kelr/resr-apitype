import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { ClassificadosProvider } from '../../database//providers/classificados';
import { IClassificados } from '../../database/models/Classificados';
import { validation } from '../../shared/middlewares';

interface IBodyProps extends Omit<IClassificados, 'id'> { }
export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    titulo: yup.string().required().min(3).max(150),
    descricao: yup.string().required().min(3).max(150),
    preco: yup.number().required(),
    telefone: yup.string().required().min(3).max(150),
    email: yup.string().required().email(),
    cidade: yup.string().required().min(3).max(150),
    estado: yup.string().required().min(2).max(2),
    categoria: yup.number().required(),
    data: yup.date(),
  })),
}));

export const ClassificadosController = {
  async create(req: Request<{}, {}, IClassificados>, res: Response) {
    const date = new Date()
    req.body.data = date;

    const result = await ClassificadosProvider.create(req.body);

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message
        }
      });
    }

    return res.status(StatusCodes.CREATED).json(result);
  }
};