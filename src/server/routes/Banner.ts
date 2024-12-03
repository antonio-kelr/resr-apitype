import { Router } from "express";
import {} from "../shared/middlewares";
import multer from "multer";
import { BannerController } from "../controllers/banner";
import { uploadBanner } from "../firebase/firebaseBanner";
const router = Router();

const uploads = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get("",  BannerController.GetAllValidation, BannerController.getAll);
router.get("/:id", BannerController.GetByIdAgenda, BannerController.getById);
router.post("",  uploads.single("imagen"), uploadBanner, BannerController.CreateValidation, BannerController.Create);
router.put("/:id", uploads.single("imagen"), uploadBanner, BannerController.updateAgenda, BannerController.update);
router.delete(
  "/:id",
  BannerController.DeleteValidation,
  BannerController.deleteById
);

export default router;
