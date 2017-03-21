const router = require('express').Router();
const authController = require('./controllers/authController.js');
const selectionController = require('./controllers/selectionController.js');
const resultController = require('./controllers/resultController.js');

router.get('/home', authController.checkUser);
router.get('/login', authController.checkUser);
router.get('/mobile', authController.mobileView);
router.get('/processing', authController.porcessing);

router.post('/api/resultWeeklySubmission', resultController.submitWeeklyResult);
router.post('/api/resultFinalSubmission', resultController.submitFinalsResult);
router.post('/api/resultTootSubmission', resultController.submitTootResult);

router.get('/api/ranking', resultController.sendRanking);

router.post('/api/finalSelection', selectionController.submitFinalsResult);
// router.post('/api/weeklySelection', selectionController.submitWeeklySelection);
// router.post('/api/tootBootSelection', selectionController.submitTootBootSelection);

// router.post('/api/createTeam', authController.createTeam);
// router.post('/api/joinTeam', authController.joinTeam);

router.post('/api/signup', authController.signup);
router.post('/api/login', authController.login);
router.get('/api/logout', authController.logout);

router.get('/*', authController.checkUser);

module.exports = router;
