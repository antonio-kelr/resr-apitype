import { Request, Response } from "express";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { StatusCodes } from "http-status-codes";
import { IRecados } from "../../database/models/recados";
import { RecadosProvaider } from "../../database/providers/recados";
import { generateSlug } from "../slug/slug";

interface IBodyProps extends Omit<IRecados, 'id' | 'slug'> {}

export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      nome: yup.string().required().min(5).max(150),
      telefone: yup.string().required().min(7).max(15),
      email: yup.string().required().email(),
      mensagem: yup.string().required().min(10).max(150),
      usuario_id: yup.number().required(),
    })
  ),
}));

export const Create = async (req: Request<{}, {}, IRecados>, res: Response) => {

  const slug = req.body.slug = generateSlug(req.body.nome);
  console.log('slug aqui', slug);
  

  const result = await RecadosProvaider.create(req.body);
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
