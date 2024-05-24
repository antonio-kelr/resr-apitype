import { StatusCodes } from "http-status-codes"
import { testServer } from "../jest.setup"

describe('Cidades - Getall', () => {
    let accessToken = '';
    beforeAll(async () => {
      const email = 'create-cidades@gmail.com';
      await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
      const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });
  
      accessToken = signInRes.body.accessToken;
    });
  

    it('Busca todos os Registros', async () => {

        const rest1 = await testServer
            .post('/cidades')
            .set({authorization: `Bearer ${accessToken}`})
            .send({ nome: 'Caixias do sul' })

            expect(rest1.statusCode).toEqual(StatusCodes.CREATED)
            
        const  buscaRegistros = await testServer
            .get('/cidades')
            .set({authorization: `Bearer ${accessToken}`})
            .send()

          expect(Number(buscaRegistros.header['x-total-count'])).toBeGreaterThan(0)
          expect(buscaRegistros.statusCode).toEqual(StatusCodes.OK)
          expect(buscaRegistros.body.length).toBeGreaterThan(0);
          
          
    })

})