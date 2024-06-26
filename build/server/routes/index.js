"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controllers_1 = require("./../controllers");
const TokenValidetion_1 = require("../shared/middlewares/TokenValidetion");
const router = (0, express_1.Router)();
exports.router = router;
router.get("/", (req, res) => {
    return res.send(`ola dev tudo bem com GET chama`);
});
router.get('/cidades', TokenValidetion_1.TokemValidation, controllers_1.criateCidade.GetAllValidation, controllers_1.criateCidade.getAll);
router.post('/cidades', TokenValidetion_1.TokemValidation, controllers_1.criateCidade.CreateValidation, controllers_1.criateCidade.Create);
router.get('/cidades/:id', TokenValidetion_1.TokemValidation, controllers_1.criateCidade.GetByIdValidation, controllers_1.criateCidade.getById);
router.put('/cidades/:id', TokenValidetion_1.TokemValidation, controllers_1.criateCidade.updateValidation, controllers_1.criateCidade.update);
router.delete('/cidades/:id', TokenValidetion_1.TokemValidation, controllers_1.criateCidade.DeleteValidation, controllers_1.criateCidade.deliteBayID);
router.get('/pessoas', TokenValidetion_1.TokemValidation, controllers_1.criatePesoa.GetAllValidation, controllers_1.criatePesoa.getAll);
router.post('/pessoas', TokenValidetion_1.TokemValidation, controllers_1.criatePesoa.CreateValidation, controllers_1.criatePesoa.Create);
router.get('/pessoas/:id', TokenValidetion_1.TokemValidation, controllers_1.criatePesoa.GetByIdValidation, controllers_1.criatePesoa.getById);
router.put('/pessoas/:id', TokenValidetion_1.TokemValidation, controllers_1.criatePesoa.updateValidation, controllers_1.criatePesoa.update);
router.delete('/pessoas/:id', TokenValidetion_1.TokemValidation, controllers_1.criatePesoa.DeleteValidation, controllers_1.criatePesoa.deliteBayID);
router.post('/cadastrar', controllers_1.UsuariosController.singUpValidation, controllers_1.UsuariosController.SigUp);
router.post('/entrar', controllers_1.UsuariosController.signInValidation, controllers_1.UsuariosController.signIn);
