import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IAgenda } from '../../database/models';
import { AgendaProvader } from '../../database/providers/agendas';
import { generateSlug } from '../slug/slug';


interface IBodyProps extends Omit<IAgenda, 'id' | 'slug'> { }
export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(3).max(150),
    data: yup.date().required(),
    descricao: yup.string().required().min(3).max(150),
    url: yup.string().url().optional(),


  })),
}));

export const Create = async (req: Request<{}, {}, IAgenda>, res: Response) => {
  req.body.data = new Date(req.body.data);
  const slug = req.body.slug = generateSlug(req.body.nome);
  console.log(slug);
  const result = await AgendaProvader.create(req.body);

     
   

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

    console.log(req.body.data);
    console.log(typeof req.body.data);
    
  return res.status(StatusCodes.CREATED).json(result);
};

