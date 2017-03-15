const router = require('express').Router();
const authController = require('./controllers/authController.js');
const selectionController = require('./controllers/selectionController.js');
const resultController = require('./controllers/resultController.js');

router.post('/api/signup', authController.signup);
router.post('/api/login', authController.login);

router.post('/api/selection', selectionController.submitSelection);
router.post('/api/resultSubmission', resultController.submitResult);

router.get('/home', authController.checkUser);


module.exports = router;