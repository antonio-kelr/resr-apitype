import { ETableNames } from '../../ETableNames';
import { Knex } from '../../knex';
import { IUsuario } from '../../models';

interface IRecado {
    id: number;
    usuario_id: number;
}

interface IUsuarioWithRecados extends IUsuario {
    recadoUser?: IRecado[];
}

export const getAll = async (page: number, limit: number, filter: string, id = 0): Promise<IUsuarioWithRecados[] | Error> => {
    try {
        let query = Knex(ETableNames.usuario).select('*').offset((page - 1) * limit).limit(limit);

        if (id > 0) {
            query = query.where('id', '=', id);
        } else if (filter) {
            query = query.orWhere('nome', 'like', `%${filter}%`);
        }

        const result = await query;

        if (id > 0 && result.length === 0) {
            return new Error('Usuário não encontrado');
        }

        const userIds = result.map(user => user.id);
        const recados = await Knex(ETableNames.recados)
            .select('*')
            .whereIn('usuario_id', userIds);

        const resultWithRecados = result.map(user => {
            const userRecados = recados.filter(usuario => usuario.usuario_id === user.id);
            return {
                ...user,
                recadoUser: userRecados
            };
        });

        return resultWithRecados;
    } catch (error) {
        console.error(error);
        return new Error('Erro ao consultar os registros');
    }
};
