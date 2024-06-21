import { Router } from 'express';

const router = Router();

router.post('/register', (req, res) => {
  res.send({ success: true });
});

router.post('/login', (req, res) => {
  res.send({ success: true });
});

export default router;
