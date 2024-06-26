const { Router } = require('express');
const { container } = require('../bootstrap/container');
const asyncHandler = require('../error/async-handler');

const UserController = container.resolve('UserController');

const router = Router();

router.post('/register', asyncHandler((req, res) => UserController.register(req, res)));

router.post('/login', asyncHandler((req, res) => UserController.login(req, res)));

router.get('/logout', asyncHandler((req, res) => UserController.logout(req, res)));

router.get('/verify', asyncHandler((req, res) => UserController.verify(req, res)));

module.exports = router;
