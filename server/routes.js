const router = require('express').Router();
const authController = require('./controllers/authController.js');
const selectionController = require('./controllers/selectionController.js');
const resultController = require('./controllers/resultController.js');

router.post('/api/signup', authController.signup);
router.post('/api/login', authController.login);

router.post('/api/weeklySelection', selectionController.submitWeeklySelection);
router.post('/api/topThreeSelection', selectionController.submitTopThreeSelection);
router.post('/api/tootBootSelection', selectionController.submitTootBootSelection);
router.post('/api/resultSubmission', resultController.submitResult);

router.get('/home', authController.checkUser);
router.get('/api/ranking', resultController.sendRanking);

module.exports = router;
