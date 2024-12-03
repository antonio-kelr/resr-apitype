
import * as create from './Create'
import * as getAll from './GetAll'
import * as getById from './GetById'
import * as update from './Update'
import * as deliteBayID from './DeleteById'
import * as deliteBaySlug from './GetBySlug'

export const CoberturaController =  {
    ...create,
    ...getAll,
    ...getById,
    ...update,
    ...deliteBayID,
    ...deliteBaySlug,

};




