const db = require('../database/db.js');

const weekID = 1;

function getSubmissionWeekly(username) {
  return db.Selection.findOne({
    where: {
      username,
      weekID,
    },
  });
}

function getSubmissionTopThree(username) {
  return db.TopThree.findOne({
    where: {
      username,
      weekID,
    },
  });
}

function getSubmissionTootBoot(username) {
  return db.TootBoot.findOne({
    where: {
      username,
      weekID,
    },
  });
}

function createWeeklySubmission(username, winnerID, runnerUpID, bottomID, eliminatedID) {
  return db.Selection.create({
    username,
    weekID,
    winnerID,
    runnerUpID,
    bottomID,
    eliminatedID,
  });
}

function createTopThreeSubmission(username, winnerTopThreeID, runnerUpTopThreeID, topThreeID) {
  return db.Selection.create({
    username,
    weekID,
    winnerTopThreeID,
    runnerUpTopThreeID,
    topThreeID,
  });
}

function createTootBootSubmission(username, selection) {
  return db.Selection.create({
    username,
    weekID,
    selection,
  });
}

function submitWeeklySelection(req, res) {
  getSubmissionWeekly(req.body.user, weekID)
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
  getSubmissionTopThree(req.body.user, weekID)
  .then((entry) => {
    if (entry === null) { // entry has not been made for that users this week
      createTopThreeSubmission(req.body.user, req.body.winnerTopThreeID, req.body.runnerUpTopThreeID, req.body.TopThreeID);
    } else { // entry has already been made and will update
      entry.updateAttributes({
        winnerTopThreeID: req.body.winnerID,
        runnerUpTopThreeID: req.body.runnerUpID,
        TopThreeID: req.body.bottomID,
      });
    }
    res.send('submitted');
  });
}

function submitTootBootSelection(req, res) {
  getSubmissionTootBoot(req.body.user, weekID)
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
