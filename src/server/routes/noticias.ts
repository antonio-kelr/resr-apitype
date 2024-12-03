import { Request, Response, Router } from "express";
import { NoticiaController } from "../controllers";
import { uploadSingleImg } from '../firebase/firebaseNoticias';
import multer from "multer";
import { deleteImageFromFirebase } from "../firebase/deleImg";
import { updateById } from "../database/providers/noticias/UpdateByid";

const router = Router();

const uploads = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

router.get('', NoticiaController.GetAllValidation, NoticiaController.getAll);
// router.get('/:id', NoticiaController.GetByIdNoticias, NoticiaController.getById);
router.get('/:slug', NoticiaController.GetBySlugValidation, NoticiaController.getBySlugnoticia);
router.post('',  uploads.single("imagen"), uploadSingleImg, NoticiaController.CreateValidation, NoticiaController.Create);
router.put('/:id', uploads.single("imagen"), uploadSingleImg, NoticiaController.updateNoticias, NoticiaController.update);
router.delete('/:id', NoticiaController.DeleteValidation, NoticiaController.deleteById);

router.delete('', async (req: Request, res: Response) => {
  const { filePath, noticiaId } = req.body;

  if (!filePath || !noticiaId) {
    return res.status(400).json({ error: 'Caminho do arquivo e ID da notícia são necessários.' });
  }

  try {
    // Remova a imagem do Firebase
    await deleteImageFromFirebase(filePath);

    // Atualize o registro da notícia no banco de dados para remover a URL da imagem
    const result = await updateById(noticiaId, { url: '' }); // Atualiza apenas o campo `url`
    
    if (result instanceof Error) {
      return res.status(500).json({ error: result.message });
    }

    res.status(200).json({ message: 'Imagem removida com sucesso e URL atualizada.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao remover a imagem.' });
  }
});

export default router;
