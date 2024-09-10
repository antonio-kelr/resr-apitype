import { Router } from "express";
import { CoberturaController } from "../controllers/coberturas";

const router = Router()

router.get('', CoberturaController.GetAllValidation, CoberturaController.getAll);
router.post('',    CoberturaController.CreateValidation, CoberturaController.Create);
router.get('/:id',  CoberturaController.GetByIdAgenda, CoberturaController.getById);
router.put('/:id',  CoberturaController.updateAgenda, CoberturaController.update);
router.delete('/:id',  CoberturaController.DeleteValidation, CoberturaController.deleteById);

export default router