import { Router } from "express";
import { AgendasController } from "../controllers";
import { TokemValidation } from "../shared/middlewares";

const router = Router()

router.get('', TokemValidation, AgendasController.GetAllValidation, AgendasController.getAll);
router.post('', TokemValidation, AgendasController.CreateValidation, AgendasController.Create);
router.get('/:id', TokemValidation, AgendasController.GetByIdAgenda, AgendasController.getById);
router.put('/:id', TokemValidation, AgendasController.updateAgenda, AgendasController.update);
router.delete('/:id', TokemValidation, AgendasController.DeleteValidation, AgendasController.deleteById);

export default router