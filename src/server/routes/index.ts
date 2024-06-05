import {Router } from 'express'
import { UsuariosController, criateCidade, criatePesoa, criateAgenda } from './../controllers'
import { TokemValidation } from '../shared/middlewares/TokenValidetion';

const router = Router()

router.get("/", (req, res) => {
    return res.send(`ola dev tudo bem com GET chama dev`);
});

router.get('/cidades',TokemValidation, criateCidade.GetAllValidation, criateCidade.getAll);
router.post('/cidades',TokemValidation, criateCidade.CreateValidation, criateCidade.Create);
router.get('/cidades/:id',TokemValidation, criateCidade.GetByIdValidation, criateCidade.getById);
router.put('/cidades/:id',TokemValidation, criateCidade.updateValidation, criateCidade.update);
router.delete('/cidades/:id',TokemValidation, criateCidade.DeleteValidation, criateCidade.deliteBayID);



router.get('/pessoas',TokemValidation, criatePesoa.GetAllValidation, criatePesoa.getAll);
router.post('/pessoas',TokemValidation, criatePesoa.CreateValidation, criatePesoa.Create);
router.get('/pessoas/:id',TokemValidation, criatePesoa.GetByIdValidation, criatePesoa.getById);
router.put('/pessoas/:id',TokemValidation, criatePesoa.updateValidation, criatePesoa.update);
router.delete('/pessoas/:id',TokemValidation, criatePesoa.DeleteValidation, criatePesoa.deliteBayID);

router.get('/agendas',TokemValidation, criateAgenda.GetAllValidation, criateAgenda.getAll);
router.post('/agendas',TokemValidation, criateAgenda.CreateValidation, criateAgenda.Create);
router.get('/agendas/:id',TokemValidation, criateAgenda.GetByIdAgenda, criateAgenda.getById);
router.put('/agendas/:id',TokemValidation, criateAgenda.updateAgenda, criateAgenda.update);
router.delete('/agendas/:id',TokemValidation, criateAgenda.DeleteValidation, criateAgenda.deliteBayID);



router.post('/cadastrar', UsuariosController.singUpValidation, UsuariosController.SigUp);
router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);


export{router}