import { Request, Response } from 'express';
import * as yup from 'yup';

import { validation } from '../../shared/middlewares';
import { StatusCodes } from 'http-status-codes';
import { IRecados } from '../../database/models/recados';
import { RecadosProvaider } from '../../database/providers/recados';
import { generateSlug } from '../slug/slug';

interface IParamProps {
  id?: number;
}
interface IBodyProps extends Omit<IRecados, 'id'> {
  slug?: string;
}

export const updateAgenda = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    nome: yup.string().required().min(5).max(150),
    telefone: yup.string().required().min(7).max(15),
    email: yup.string().required().email(),
    mensagem: yup.string().required().min(10).max(150),
    slug: yup.string().optional(),
    usuario_id: yup.number().required(),
  })),
  params: getSchema<IParamProps>(yup.object().shape({
    id: yup.number().integer().optional().moreThan(0),
  })),
}));

export const update = async (req: Request<IParamProps, {}, IBodyProps>, res: Response) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: 'O parâmetro "id" precisa ser informado.'
      }
    });
  }

  // Gerar novo slug a partir do título atualizado
  const slug = generateSlug(req.body.nome);
  req.body.slug = slug; // Adiciona o novo slug ao corpo da requisição
  
  const result = await RecadosProvaider.updateById(req.params.id, req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message
      }
    });
  }

  return res.status(StatusCodes.NO_CONTENT).send(result);
};
