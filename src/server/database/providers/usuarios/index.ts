import * as getById from './GetEmail';
import * as create from './Create';


export const UsuarioProvader = {
  ...getById,
  ...create,
};
