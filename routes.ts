import { Router } from 'express';

const router = Router();

router.get('/hello', (req, res) => {
  res.json({ message: 'Bonjour Gill, bienvenue sur ton API !' });
});

export default router;
