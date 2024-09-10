import { Request, Response } from 'express';
import * as yup from 'yup';
import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { INoticias } from '../../database/models/Noticias';
import { NoticiasProvaider } from '../../database/providers/noticias';
import multer from 'multer';


interface IParamProps {
  id?: number;
}

interface IBodyProps extends Omit<INoticias, 'id'> {}

export const updateNoticias = [
  validation((getSchema) => ({
    
    body: getSchema<IBodyProps>(yup.object().shape({
      titulo: yup.string().required().min(3).max(150),
      data: yup.date().required(),
      descricao: yup.string().required().min(3).max(150),
      url: yup.string().url().optional(),
    })),
    params: getSchema<IParamProps>(yup.object().shape({
      id: yup.number().integer().optional().moreThan(0),
    })),
  })),
];

export const update = async (req: Request<IParamProps, {}, IBodyProps>,res: Response) => {

  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.',
      },
    });
  }
  console.log('dados aqui',req.body);
  
  const result = await NoticiasProvaider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send(result);
};
