import { Router } from "express";
import { TokemValidation } from "../shared/middlewares";
import { CidadesController } from "../controllers";

const router = Router()

router.get('', TokemValidation, CidadesController.GetAllValidation, CidadesController.getAll);
router.post('', TokemValidation, CidadesController.CreateValidation, CidadesController.create);
router.get('/:id', TokemValidation, CidadesController.GetByIdValidation, CidadesController.getById);
router.put('/:id', TokemValidation, CidadesController.updateValidation, CidadesController.update);
router.delete('/:id', TokemValidation, CidadesController.DeleteValidation, CidadesController.deleteById);

export default router