import { Knex } from 'knex';

import { ETableNames } from '../ETableNames';
import { IClassificados } from '../models/Classificados';
import { ICategoria } from '../models/Categoria';


export const seed = async (knex: Knex) => {
  const [{ count }] = await knex(ETableNames.categoria).count<[{ count: number }]>('* as count');
  if (!Number.isInteger(count) || Number(count) > 0) return;

  const cidadesToInsert = categorias.map(item => ({ titulo: item.titulo, slug: item.slug }));
  await knex(ETableNames.categoria).insert(cidadesToInsert);
};


const categorias: ICategoria[] = [
  {
    titulo: 'Carros',
    slug: 'carros'
  },
  {
    titulo: 'Motos',
    slug: 'motos'
  },
  {
    titulo: 'Imóveis',
    slug: 'imoveis'
  },
  {
    titulo: 'Eletrônicos',
    slug: 'eletronicos'
  },
  {
    titulo: 'Informática',
    slug: 'informatica'
  },
  {
    titulo: 'Serviços',
    slug: 'servicos'
  },
  {
    titulo: 'Empregos',
    slug: 'empregos'
  },
  {
    titulo: 'Moda',
    slug: 'moda'
  },
  {
    titulo: 'Esportes',
    slug: 'esportes'
  },
  {
    titulo: 'Outros',
    slug: 'outros'
  }
]