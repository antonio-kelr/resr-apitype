
import * as create from './Create'
import * as getAll from './GetAll'
import * as getById from './GetById'
import * as GetBySlug from './GetBySlug'
import * as update from './Update'
import * as deliteBayID from './DeleteById'

export const RecadoController =  {
    ...create,
    ...getAll,
    ...getById,
    ...GetBySlug,
    ...update,
    ...deliteBayID,

};




