import { Router } from "express";
import { TokemValidation } from "../shared/middlewares";
import { CidadesController } from "../controllers";

const router = Router()

router.get('',  CidadesController.GetAllValidation, CidadesController.getAll);
router.post('',  CidadesController.CreateValidation, CidadesController.create);
router.get('/:id',  CidadesController.GetByIdValidation, CidadesController.getById);
router.put('/:id',  CidadesController.updateValidation, CidadesController.update);
router.delete('/:id',  CidadesController.DeleteValidation, CidadesController.deleteById);

export default router