import { Router } from "express";
import { RecadoController } from "../controllers/recados";
import { TokemValidation } from "../shared/middlewares";

const router = Router()

router.get('',  RecadoController.GetAllValidation,  RecadoController.getAll);
router.post('',     RecadoController.CreateValidation,  RecadoController.Create);
router.get('/:id',   RecadoController.GetByIdAgenda,  RecadoController.getById);
router.put('/:id',   RecadoController.updateAgenda,  RecadoController.update);
router.delete('/:id',   RecadoController.DeleteValidation,  RecadoController.deleteById);

export default router