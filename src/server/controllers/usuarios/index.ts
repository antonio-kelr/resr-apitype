import * as signIn from './Singin';
import * as signUp from './SingUp';
import * as getall from './Getall';


export const UsuariosController = {
  ...signIn,
  ...signUp,
  ...getall
};