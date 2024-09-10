import { Router } from "express";
import {
  ClassificadosController,
  CreateValidation,
  DeleteValidation,
} from "../controllers/classificados";
import { TokemValidation } from "../shared/middlewares";
import {UpdateClassificado,update,} from "../controllers/classificados/Updade";
import { GetAllClassificados, getAll } from "../controllers/classificados/GetAll";
const router = Router();

router.get("",GetAllClassificados ,getAll);
router.get("/categorias",GetAllClassificados ,getAll);
router.post("", CreateValidation, ClassificadosController.create);
router.put("/:id", UpdateClassificado, update);
router.delete("/:id", DeleteValidation, ClassificadosController.deleteById);

export default router;
