import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

import { UsuarioProvader } from '../../database/providers/usuarios';
import { JWTtoken, PasswordCrypot } from '../../shared/services';
import { validation } from '../../shared/middlewares/Validation';
import { IUsuario } from '../../database/models';


interface IBodyProps extends Omit<IUsuario, 'id' | 'nome' | 'recado_id'> { }

export const signInValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(yup.object().shape({
    senha: yup.string().required().min(6),
    email: yup.string().required().email().min(5),
  })),
}));

export const signIn = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  const { email, senha } = req.body;


  const usuario = await UsuarioProvader.getByEmail(email);
  if (usuario instanceof Error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });
  }
  

  const passwordMatch = await PasswordCrypot.verifyPassword(senha, usuario.senha);
  if (!passwordMatch) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      errors: {
        default: 'Email ou senha são inválidos'
      }
    });
  } else {

    const accessToken = JWTtoken.sign({ uid: usuario.id });
    if (accessToken === 'JWT_SECRET_NOT_FOUND') {
      
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        errors: {
          default: 'Erro ao gerar o token de acesso'
        }
      });
    }
    return res.status(StatusCodes.OK).json({ accessToken, userId: usuario.id  });
    
  }
};

