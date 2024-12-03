import {IAgenda, ICidades, IclassificaImgs, ICoberturas, ICoberturasImagens, INoticias, IPessoa, IUsuario, Ibanner, Ianucio} from '../../models'
import { IClassificados } from '../../models/Classificados'
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
      noticias: INoticias
      classificados: IClassificados
      classificadoImgs: IclassificaImgs
      banner: Ibanner
      anucio: Ianucio
      
    }
  }