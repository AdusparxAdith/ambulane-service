const { Router } = require('express');
const { container } = require('../bootstrap/container');
const asyncHandler = require('../error/async-handler');

const LocationController = container.resolve('LocationController');

const router = Router();

router.get('/', asyncHandler((req, res) => LocationController.getLocations(req, res)));

router.get('/nearby', asyncHandler((req, res) => LocationController.getNearby(req, res)));

router.post('/start', ((req, res) => {
  res.send({ success: true });
}));

router.post('/stop', (req, res) => {
  res.send({ success: true });
});

module.exports = router;
