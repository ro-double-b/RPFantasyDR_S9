const db = require('../database/db.js');

function getResult(weekID) {
  return db.Results.findOne({
    where: {
      weekID,
    },
  });
}

function createResult(weekID, winnerID, runnerUpID, bottomID, eliminatedID) {
  return db.Results.create({
    weekID,
    winnerID,
    runnerUpID,
    bottomID,
    eliminatedID,
  });
}

function submitResult(req, res) {
  getResult(req.body.weekID)
  .then((entry) => {
    if (entry === null) {
      createResult(req.body.weekID, req.body.winnerID, req.body.runnerUpID, req.body.bottomID, req.body.eliminatedID);
    } else {
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
  submitResult,
};
