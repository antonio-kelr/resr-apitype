import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades- DeleteById', () => {

    let accessToken = '';
    beforeAll(async () => {
        const email = 'create-cidades@gmail.com';
        await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
        const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

        accessToken = signInRes.body.accessToken;
    });




    it('Apagar registros', async () => {

        const rest1 = await testServer
            .post('/cidades')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send({ nome: 'Caixias do sul' })

        expect(rest1.statusCode).toEqual(StatusCodes.CREATED)

        const apagaRegistro = await testServer
            .delete(`/cidades/${rest1.body}`)
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()

        expect(apagaRegistro.statusCode).toEqual(StatusCodes.NO_CONTENT)

    })
    it('tenta apagar um registro que nao existir', async () => {

        const rest1 = await testServer
            .delete('/cidades/99999')
            .set({ Authorization: `Bearer ${accessToken}` })
            .send()


        expect(rest1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR)
        expect(rest1.body).toHaveProperty('errors.default')
    })
    it('tenta apagar um registro sei o token', async () => {

        const rest1 = await testServer
            .delete('/cidades/99999')
            // .set({ Authorization: `Bearer ${accessToken}` })
            .send()


        expect(rest1.statusCode).toEqual(StatusCodes.UNAUTHORIZED)
        expect(rest1.body).toHaveProperty('errors.default')
    })

})