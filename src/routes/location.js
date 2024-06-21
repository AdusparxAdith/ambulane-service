const { Router } = require('express');
const { container } = require('../bootstrap/container');

const LocationController = container.resolve('LocationController');

const router = Router();

router.get('/', async (req, res) => {
  const locations = await LocationController.getLocations();
  res.send(locations);
});

router.get('/nearby', (req, res) => {
  res.send([1, 2]);
});

router.post('/start', (req, res) => {
  res.send({ success: true });
});

router.post('/stop', (req, res) => {
  res.send({ success: true });
});

module.exports = router;
