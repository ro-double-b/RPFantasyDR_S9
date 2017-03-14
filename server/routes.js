const router = require('express').Router();
const authController = require('./controllers/authController.js');

router.post('/api/signup', authController.signup);
router.post('/api/login', authController.login);

module.exports = router;