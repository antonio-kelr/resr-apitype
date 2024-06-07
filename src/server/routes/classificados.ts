import { Router } from "express";
import { ClassificadosController, CreateValidation } from "../controllers/classificados";
import { TokemValidation } from "../shared/middlewares";

const router = Router()

router.post('', CreateValidation, ClassificadosController.create);

export default router