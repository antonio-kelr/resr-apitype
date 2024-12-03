
import * as create from './Create'
import * as getAll from './GetAll'
import * as getById from './GetById'
import * as getBySlug from './GetBySlug'
import * as update from './Update'
import * as deliteBayID from './DeleteById'

export const NoticiaController =  {
    ...create,
    ...getAll,
    ...getById,
    ...getBySlug,
    ...update,
    ...deliteBayID,

};




