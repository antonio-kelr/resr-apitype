import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares";
import { ClassificadosProvider } from "../../database/providers/classificados";
import { IClassificados } from "../../database/models/Classificados";

// Validação para criação
interface IBodyProps extends Omit<IClassificados, "id" | "classificadoImg"> {}
export const CreateValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      titulo: yup.string().required().min(3).max(150),
      descricao: yup.string().required().min(3).max(150),
      preco: yup.number().required(),
      telefone: yup.string().required().min(3).max(15),
      email: yup.string().required().email(),
      cidade: yup.string().required().min(3).max(150),
      estado: yup.string().required().min(2).max(2),
      categoria: yup.number().required(),
      data: yup.date(),
    })
  ),
}));

interface IQueryProps {
  id?: number;
}
export const DeleteValidation = validation((getSchema) => ({
  params: getSchema<IQueryProps>(
    yup.object().shape({
      id: yup.number().integer().moreThan(0),
    })
  ),
}));

export const ClassificadosController = {
  async create(req: Request<{}, {}, IClassificados>, res: Response) {
    const date = new Date();
    req.body.data = date;

    const result = await ClassificadosProvider.create(req.body);

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.CREATED).json(result);
  },


  async getAllCategorias(req: Request<{}, {}, IClassificados>, res: Response) {
    const result = await ClassificadosProvider.getAllCategorias();

    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: { default: result.message },
      });
    }

    res.setHeader("access-control-expose-headers", "x-total-count");
    res.setHeader("x-total-count", result.toString());

    return res.status(StatusCodes.OK).json(result);
  },

  async deleteById(req: Request<IQueryProps>, res: Response) {
    const { id } = req.params;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        errors: {
          default: 'O parâmetro "id" precisa ser informado.',
        },
      });
    }

    const result = await ClassificadosProvider.DeleteAll(id);
    if (result instanceof Error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: result.message,
        },
      });
    }

    return res.status(StatusCodes.NO_CONTENT).send();
  },
};
