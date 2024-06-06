import { Router } from "express";
import { TokemValidation } from "../shared/middlewares";
import { PessoasController } from "../controllers";

const router = Router()

router.get('', TokemValidation, PessoasController.GetAllValidation, PessoasController.getAll);
router.post('', TokemValidation, PessoasController.CreateValidation, PessoasController.create);
router.get('/:id', TokemValidation, PessoasController.GetByIdValidation, PessoasController.getById);
router.put('/:id', TokemValidation, PessoasController.updateValidation, PessoasController.update);
router.delete('/:id', TokemValidation, PessoasController.DeleteValidation, PessoasController.deleteById);

export default router