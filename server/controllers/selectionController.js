const db = require('../database/db.js');

const weekWeekID = 2;
const tootWeekID = 2;

function getSubmissionWeekly(username) {
  return db.Selection.findOne({
    where: {
      username,
      weekWeekID,
    },
  });
}

function getSubmissionTopThree(username) {
  return db.TopThree.findOne({
    where: {
      username,
    },
  });
}

function getSubmissionTootBoot(username) {
  return db.TootBoot.findOne({
    where: {
      username,
      tootWeekID,
    },
  });
}

function createWeeklySubmission(username, winnerID, runnerUpID, bottomID, eliminatedID) {
  return db.Selection.create({
    username,
    weekWeekID,
    winnerID,
    runnerUpID,
    bottomID,
    eliminatedID,
  });
}

function createTopThreeSubmission(username, winnerTopThreeID, runnerUpTopThreeID, topThreeID) {
  return db.TopThree.create({
    username,
    winnerTopThreeID,
    runnerUpTopThreeID,
    topThreeID,
  });
}

function createTootBootSubmission(username, selection) {
  return db.TootBoot.create({
    username,
    tootWeekID,
    selection,
  });
}

function submitWeeklySelection(req, res) {
  getSubmissionWeekly(req.body.user, weekWeekID)
  .then((entry) => {
    if (entry === null) { // entry has not been made for that users this week
      createWeeklySubmission(req.body.user, req.body.winnerID, req.body.runnerUpID, req.body.bottomID, req.body.eliminatedID);
    } else { // entry has already been made and will update
      entry.updateAttributes({
        winnerID: req.body.winnerID,
        runnerUpID: req.body.runnerUpID,
        bottomID: req.body.bottomID,
        eliminatedID: req.body.eliminatedID,
      });
    }
    res.send('submitted');
  });
}

function submitTopThreeSelection(req, res) {
  getSubmissionTopThree(req.body.user)
  .then((entry) => {
    if (entry === null) { // entry has not been made for that users this week
      createTopThreeSubmission(req.body.user, req.body.winnerTopThreeID, req.body.runnerUpTopThreeID, req.body.topThreeID);
    } else { // entry has already been made and will update
      entry.updateAttributes({
        winnerTopThreeID: req.body.winnerTopThreeID,
        runnerUpTopThreeID: req.body.runnerUpTopThreeID,
        topThreeID: req.body.topThreeID,
      });
    }
    res.send('submitted');
  });
}

function submitTootBootSelection(req, res) {
  getSubmissionTootBoot(req.body.user, tootWeekID)
  .then((entry) => {
    if (entry === null) { // entry has not been made for that users this week
      createTootBootSubmission(req.body.user, req.body.selection);
    } else { // entry has already been made and will update
      entry.updateAttributes({
        selection: req.body.seclection,
      });
    }
    res.send('submitted');
  });
}

module.exports = {
  submitWeeklySelection,
  submitTopThreeSelection,
  submitTootBootSelection,

};
