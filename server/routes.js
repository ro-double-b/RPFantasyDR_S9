const router = require('express').Router();
const authController = require('./controllers/authController.js');
const selectionController = require('./controllers/selectionController.js');

router.post('/api/signup', authController.signup);
router.post('/api/login', authController.login);

router.post('/api/selection', selectionController.submitSelection);

router.get('/home', authController.checkUser);


module.exports = router;