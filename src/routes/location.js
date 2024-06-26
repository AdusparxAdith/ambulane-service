const { Router } = require('express');
const { container } = require('../bootstrap/container');
const asyncHandler = require('../error/async-handler');
const { authenticateRoute } = require('../utils/authentication');

const LocationController = container.resolve('LocationController');

const router = Router();

router.get('/', authenticateRoute, asyncHandler((req, res) => LocationController.getLocations(req, res)));

router.post('/nearby', authenticateRoute, asyncHandler((req, res) => LocationController.getNearby(req, res)));

router.post('/start', authenticateRoute, ((req, res) => {
  res.send({ success: true });
}));

router.post('/stop', authenticateRoute, (req, res) => {
  res.send({ success: true });
});

module.exports = router;
