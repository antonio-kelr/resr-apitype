import * as deleteById from './DeleteByid';
import * as updateById from './UpdateByid';
import * as getById from './GetByid';
import * as create from './create';
import * as getAll from './Getall';
import * as count from './Count';


export const ClassificadoProvider= {
  ...deleteById,
  ...updateById,
  ...getById,
  ...create,
  ...getAll,
  ...count
};
