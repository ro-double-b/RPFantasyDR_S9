const db = require('../database/db.js');
const points = 5;

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

function createTotal(username, totalArr) {
  return db.Totals.create({
    username,
    totals: totalArr,
  });
}

function getUsers() {
  return db.User.findAll({
  })
}

function getUserSelection(username) {
  return db.Selection.findAll({
    where: {
      username,
    },
  });
}

function getResults() {
  return db.Results.findAll();
}

function getTotal(username) {
  return db.Totals.findOne({
    where: {
      username,
    },
  });
}

function updateTotals() {
  getResults()
  .then((results) => {
    getUsers() // get every user
    .then((users) => {
      users.forEach((user, index) => { // iterate over each user
        const userValue = user.dataValues.username;
        const total = [];
        getUserSelection(userValue)
        .then((selections) => {
          results.forEach((weekResult) => {
            selections.forEach((weekUserSelection) => {
              if (weekResult.dataValues.weekID === weekUserSelection.dataValues.weekID) {
                let weeklyTotal = 0;
                if (weekResult.dataValues.winnerID === weekUserSelection.dataValues.winnerID) {
                  weeklyTotal = weeklyTotal + points;
                }
                if (weekResult.dataValues.runnerUpID === weekUserSelection.dataValues.runnerUpID) {
                  weeklyTotal = weeklyTotal + points;
                }
                if (weekResult.dataValues.bottomID === weekUserSelection.dataValues.bottomID) {
                  weeklyTotal = weeklyTotal + points;
                }
                if (weekResult.dataValues.eliminatedID === weekUserSelection.dataValues.eliminatedID) {
                  weeklyTotal = weeklyTotal + points;
                }
                total.push(weeklyTotal);
              }
            });
          });
        });
        getTotal(userValue)
        .then((entry) => {
          if (entry === null) {
            createTotal(userValue, total);
          } else {
            entry.updateAttributes({
              totals: total,
            });
          }
        });
      });
    });
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
    updateTotals();
    res.send('submitted');
  });
}

module.exports = {
  submitResult,
};
