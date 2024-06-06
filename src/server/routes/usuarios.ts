import { Router } from "express";
import { UsuariosController } from "../controllers";

const router = Router()

router.post('/cadastrar', UsuariosController.singUpValidation, UsuariosController.SigUp);
router.post('/entrar', UsuariosController.signInValidation, UsuariosController.signIn);

export default router