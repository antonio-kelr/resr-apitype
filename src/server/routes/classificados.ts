import { Router } from "express";
import { ClassificadosController, CreateValidation } from "../controllers/classificados";
import { TokemValidation } from "../shared/middlewares";

const router = Router()

router.get('', TokemValidation, CreateValidation, ClassificadosController.getAll);
router.post('', TokemValidation, CreateValidation, ClassificadosController.create);
router.get('/categorias', TokemValidation, CreateValidation, ClassificadosController.getAllCategorias);

export default router