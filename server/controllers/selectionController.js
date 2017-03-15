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
    weekID,
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
      createSubmission(req.body.user, req.body.winner.queenID, req.body.runnerup.queenID, req.body.bottom.queenID, req.body.eliminated.queenID);
    } else { // entry has already been made and will update
      entry.updateAttributes({
        winnerID: req.body.winner.queenID,
        runnerUpID: req.body.runnerup.queenID,
        bottomID: req.body.bottom.queenID,
        eliminatedID: req.body.eliminated.queenID,
      });
    }
    res.send('submitted');
  })
}

module.exports = {
  submitSelection,
};
