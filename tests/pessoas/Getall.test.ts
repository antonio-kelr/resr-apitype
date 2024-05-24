import { StatusCodes } from 'http-status-codes';

import { testServer } from '../jest.setup';


describe('Pessoas - GetAll', () => {

  let accessToken = '';
  beforeAll(async () => {
    const email = 'create-Getall@gmail.com';
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


  it('Busca registros', async () => {
    const res1 = await testServer
      .post('/pessoas')
      .set({authorization: `Bearer ${accessToken}`})

      .send({
        cidadeId,
        email: 'antoniogetall@gmail.com',
        nomeCompleto: 'antonio filho',
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscada = await testServer
      .get('/pessoas')
      .set({authorization: `Bearer ${accessToken}`})

      .send();
    expect(Number(resBuscada.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscada.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscada.body.length).toBeGreaterThan(0);
  });
});