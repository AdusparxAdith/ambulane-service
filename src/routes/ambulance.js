const { Router } = require('express');
const { container } = require('../bootstrap/container');

const AmbulanceController = container.resolve('AmbulanceController');

const router = Router();

router.get('/locations', (req, res) => {
  const locations = AmbulanceController.getLocations();
  res.send(locations);
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

module.exports = router;
