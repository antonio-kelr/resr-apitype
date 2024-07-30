import {IAgenda, ICidades, ICoberturas, ICoberturasImagens, IPessoa, IUsuario} from '../../models'
import { IRecados } from '../../models/recados'

declare module 'knex/types/tables' {
    interface Tables {
      cidade: ICidade
      pessoa: IPessoa
      usuario: IUsuario
      agenda: IAgenda
      cobertura: ICoberturas
      coberturaimagens: ICoberturasImagens
      recado: IRecados
    }
  }