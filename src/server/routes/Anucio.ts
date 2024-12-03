import { Router } from "express";
import {} from "../shared/middlewares";
import multer from "multer";
import { AnucioController } from "../controllers/anucio";
import { uploadAnucio } from "../firebase/firebaseAnucio";
const router = Router();

const uploads = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get("",  AnucioController.GetAllValidation, AnucioController.getAll);
router.get("/:id", AnucioController.GetByIdAgenda, AnucioController.getById);
router.post("",  uploads.single("imagen"), uploadAnucio, AnucioController.CreateValidation, AnucioController.Create);
router.put("/:id", uploads.single("imagen"), uploadAnucio, AnucioController.updateAgenda, AnucioController.update);
router.delete(
  "/:id",
  AnucioController.DeleteValidation,
  AnucioController.deleteById
);

export default router;
