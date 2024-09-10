import { Router } from "express";
import { ClassificadoController } from "../controllers/classificadosImgs";
import { uploadImg_classificadoImgs } from '../firebase/firebase _classificadoImgs';
import multer from "multer";

const uploads = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

const router = Router();
router.get('', ClassificadoController.GetAllValidation, ClassificadoController.getAll);
router.post('', uploads.array("imagens"), uploadImg_classificadoImgs, ClassificadoController.CreateValidation, ClassificadoController.Create);
router.get('/:id', ClassificadoController.GetByIdAgenda, ClassificadoController.getById);
router.put('/:id', ClassificadoController.updateAgenda, ClassificadoController.update);
router.delete('/:id', ClassificadoController.DeleteValidation, ClassificadoController.deleteById);

export default router;
