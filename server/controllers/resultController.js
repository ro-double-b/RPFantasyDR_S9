const db = require('../database/db.js');
const points = 5;
const weeks = 13;

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

function formatTotals(totalArr) {
  const formatedTotals = [];
  for (let i = 0; i < weeks; i++) {
    if (totalArr[i] === undefined) {
      formatedTotals.push(0);
    } else {
      formatedTotals.push(totalArr[i]);
    }
  }
  return formatedTotals;
}

function createTotal(username, totalArr, sumTotal) {
  return db.Totals.create({
    username,
    totals: totalArr,
    sumTotal,
  });
}

function getUsers() {
  return db.User.findAll({
  });
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

function getRanking() {
  return db.Totals.findAll();
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
              let weeklyTotal = 0;
              if (weekResult.dataValues.weekID === weekUserSelection.dataValues.weekID) {
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
              }
              total.push(weeklyTotal);
            });
          });
        });
        getTotal(userValue)
        .then((entry) => {
          const sumTotal = total.reduce((a, b) => {
            return a + b;
          }, 0);
          if (entry === null) {
            createTotal(userValue, formatTotals(total), sumTotal);
          } else {
            entry.updateAttributes({
              totals: formatTotals(total),
              sumTotal,
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

function sendRanking(req, res) {
  getRanking()
  .then((ranking) => {
    res.send(ranking);
  });
}

module.exports = {
  submitResult,
  sendRanking,
};
