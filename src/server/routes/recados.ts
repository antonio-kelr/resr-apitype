import { Router } from "express";
import { RecadoController } from "../controllers/recados";
import { TokemValidation } from "../shared/middlewares";

const router = Router();

router.get("", RecadoController.GetAllValidation, RecadoController.getAll);
router.get("/:slug", RecadoController.GetBySlugAgenda, RecadoController.getBySlug);
// router.get("/:id", RecadoController.GetByIdAgenda, RecadoController.getById);
router.post("", RecadoController.CreateValidation, RecadoController.Create);
router.put("/:id", RecadoController.updateAgenda, RecadoController.update);
router.delete(
  "/:id",
  RecadoController.DeleteValidation,
  RecadoController.deleteById
);

export default router;
