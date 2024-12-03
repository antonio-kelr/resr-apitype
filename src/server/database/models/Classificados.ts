
export interface IClassificados {
  id: number
  titulo: string
  descricao: string
  slug?:string
  preco: number
  telefone: string
  email: string
  cidade: string
  estado: string
  categoria: number
  data?: Date

}