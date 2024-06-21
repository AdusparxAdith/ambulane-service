const { Router } = require('express');

const router = Router();

router.post('/register', (req, res) => {
  res.send({ success: true });
});

router.post('/login', (req, res) => {
  res.send({ success: true });
});

module.exports = router;
