import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - GetById', () => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'pessoa-getbyId@gmail.com';
    await testServer.post('/cadastrar').send({ nome: 'Teste', email, senha: '123456' });
    const signInRes = await testServer.post('/entrar').send({ email, senha: '123456' });

    accessToken = signInRes.body.accessToken;
  });


  let cidadeId: number | undefined = undefined;
  beforeAll(async () => {
    const resCidade = await testServer
      .post('/cidades')
      .set({authorization: `Bearer ${accessToken}`})
      .send({ nome: 'Teste' });

    cidadeId = resCidade.body;
  });


  it('Busca registro por id', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({authorization: `Bearer ${accessToken}`})

      .send({
        cidadeId,
        nomeCompleto: 'antonio filho',
        email: 'antoniogetbyid@gmail.com',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get(`/pessoas/${res1.body}`)
      .set({authorization: `Bearer ${accessToken}`})

      .send();
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body).toHaveProperty('nomeCompleto');
  });
  it('Tenta buscar registro que não existe', async () => {
    const res1 = await testServer
      .get('/pessoas/99999')
      .set({authorization: `Bearer ${accessToken}`})

      .send();

    expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res1.body).toHaveProperty('errors.default');
  });
});