import { Router } from 'express';

const router = Router()

router.get("", (req, res) => {
  return res.send(`ola dev tudo bem com GET chama dev`);
});


export default router;
