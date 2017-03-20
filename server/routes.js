const router = require('express').Router();
const authController = require('./controllers/authController.js');
const selectionController = require('./controllers/selectionController.js');
const resultController = require('./controllers/resultController.js');

router.get('/home', authController.checkUser);
router.get('/login', authController.checkUser);
router.get('/mobile', authController.mobileView);
router.get('/api/ranking', resultController.sendRanking);

router.post('/api/signup', authController.signup);
router.post('/api/login', authController.login);
router.get('/api/logout', authController.logout);

router.post('/api/weeklySelection', selectionController.submitWeeklySelection);
router.post('/api/topThreeSelection', selectionController.submitTopThreeSelection);
router.post('/api/tootBootSelection', selectionController.submitTootBootSelection);

router.post('/api/resultWeeklySubmission', resultController.submitWeeklyResult);
router.post('/api/resultTopThreeSubmission', resultController.submitTopThreeResult);
router.post('/api/resultTootSubmission', resultController.submitTootResult);

router.get('/*', authController.checkUser)

module.exports = router;
