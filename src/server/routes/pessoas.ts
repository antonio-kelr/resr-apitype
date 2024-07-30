import { Router } from "express";
import { TokemValidation } from "../shared/middlewares";
import { PessoasController } from "../controllers";

const router = Router()

router.get('',  PessoasController.GetAllValidation, PessoasController.getAll);
router.post('',  PessoasController.CreateValidation, PessoasController.create);
router.get('/:id',  PessoasController.GetByIdValidation, PessoasController.getById);
router.put('/:id',  PessoasController.updateValidation, PessoasController.update);
router.delete('/:id',  PessoasController.DeleteValidation, PessoasController.deleteById);

export default router