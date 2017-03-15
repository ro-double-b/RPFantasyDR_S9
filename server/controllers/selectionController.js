const db = require('../database/db.js');

const weekID = 1;

function getSubmission(username) {
  return db.Selection.findOne({
    where: {
      username,
      weekID,
    },
  });
}

function createSubmission(username, winnerID, runnerUpID, bottomID, eliminatedID) {
  return db.Selection.create({
    username,
    winnerID,
    runnerUpID,
    bottomID,
    eliminatedID,
  });
}

function submitSelection(req, res) {
  getSubmission(req.body.user, weekID)
  .then((entry) => {
    if (entry === null) { // entry has not been made for that users this week
      createSubmission(req.body.user, req.body.winnerID, req.body.runnerUpID, req.body.bottomID, req.body.eliminatedID);
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

module.exports = {
  submitSelection,
};
