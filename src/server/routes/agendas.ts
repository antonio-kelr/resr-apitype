import { Router } from "express";
import { AgendasController } from "../controllers";
import { uploadSingleImg } from "../firebase/firebaseAgenda";
import {} from "../shared/middlewares";
import multer from "multer";
const router = Router();

const uploads = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get("",  AgendasController.GetAllValidation, AgendasController.getAll);
router.get('/:slug',AgendasController.GetBySlugValidation,AgendasController.getBySlug);

router.post("",  uploads.single("imagen"), uploadSingleImg, AgendasController.CreateValidation, AgendasController.Create);
router.get("/:id", AgendasController.GetByIdAgenda, AgendasController.getById);
router.put("/:id", uploads.single("imagen"), uploadSingleImg, AgendasController.updateAgenda, AgendasController.update);
router.delete(
  "/:id",
  AgendasController.DeleteValidation,
  AgendasController.deleteById
);

export default router;
