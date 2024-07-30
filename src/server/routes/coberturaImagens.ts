import { Router } from "express";
import { CoberturaImagensController } from "../controllers/coberturaimagens";
import { uploadImg } from '../firebase/firebase';
import multer from "multer";

const uploads = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

const router = Router();
router.get('', CoberturaImagensController.GetAllValidation, CoberturaImagensController.getAll);
router.post('', uploads.array("imagem"), uploadImg, CoberturaImagensController.CreateValidation, CoberturaImagensController.Create);
router.get('/:id', CoberturaImagensController.GetByIdAgenda, CoberturaImagensController.getById);
router.put('/:id', CoberturaImagensController.updateAgenda, CoberturaImagensController.update);
router.delete('/:id', CoberturaImagensController.DeleteValidation, CoberturaImagensController.deleteById);

export default router;
