import * as getById from './GetEmail';
import * as create from './Create';
import * as getall from './Getall';
import * as cout from './cout';


export const UsuarioProvader = {
  ...getById,
  ...create,
  ...getall,
  ...cout
};
