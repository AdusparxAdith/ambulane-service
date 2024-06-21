import { Router } from 'express';

const router = Router();

router.get('/locations', (req, res) => {
  res.send([1, 2]);
});

router.get('/location/nearby', (req, res) => {
  res.send([1, 2]);
});

router.post('/location/start', (req, res) => {
  res.send({ success: true });
});

router.post('/location/stop', (req, res) => {
  res.send({ success: true });
});

export default router;
