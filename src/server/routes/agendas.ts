import { Router } from "express";
import { AgendasController } from "../controllers";
import { } from "../shared/middlewares";

const router = Router()

router.get('', AgendasController.GetAllValidation, AgendasController.getAll);
router.post('',    AgendasController.CreateValidation, AgendasController.Create);
router.get('/:id',  AgendasController.GetByIdAgenda, AgendasController.getById);
router.put('/:id',  AgendasController.updateAgenda, AgendasController.update);
router.delete('/:id',  AgendasController.DeleteValidation, AgendasController.deleteById);

export default router