import {IAgenda, ICidades, IPessoa, IUsuario} from '../../models'

declare module 'knex/types/tables' {
    interface Tables {
      cidade: ICidade
      pessoa: IPessoa
      usuario: IUsuario
      agenda: IAgenda
    }
  }