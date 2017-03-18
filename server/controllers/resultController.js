const db = require('../database/db.js');
const weeklyPoints = 25;
const weeks = 13;

function getWeeklyResult(weekID) {
  return db.Results.findOne({
    where: {
      weekID,
    },
  });
}

function createWeeklyResult(weekID, winnerID, runnerUpID, bottomID, eliminatedID) {
  return db.Results.create({
    weekID,
    winnerID,
    runnerUpID,
    bottomID,
    eliminatedID,
  });
}

function formatWeeklyTotals(totalArr) {
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

function createWeeklyTotal(username, totalArr, sumTotal) {
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

function getUserWeeklySelection(username) {
  return db.Selection.findAll({
    where: {
      username,
    },
  });
}

function getWeeklyResults() {
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
  getWeeklyResults()
  .then((results) => {
    getUsers() // get every user
    .then((users) => {
      users.forEach((user, index) => { // iterate over each user
        const userValue = user.dataValues.username;
        const total = [];
        getUserWeeklySelection(userValue)
        .then((selections) => {
          results.forEach((weekResult) => {
            selections.forEach((weekUserSelection) => {
              let weeklyTotal = 0;
              if (weekResult.dataValues.weekID === weekUserSelection.dataValues.weekID) {
                if (weekResult.dataValues.winnerID === weekUserSelection.dataValues.winnerID) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (weekResult.dataValues.runnerUpID === weekUserSelection.dataValues.runnerUpID) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (weekResult.dataValues.bottomID === weekUserSelection.dataValues.bottomID) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (weekResult.dataValues.eliminatedID === weekUserSelection.dataValues.eliminatedID) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
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
            createWeeklyTotal(userValue, formatWeeklyTotals(total), sumTotal);
          } else {
            entry.updateAttributes({
              totals: formatWeeklyTotals(total),
              sumTotal,
            });
          }
        });
      });
    });
  });
}

function submitWeeklyResult(req, res) {
  getWeeklyResult(req.body.weekID)
  .then((entry) => {
    if (entry === null) {
      createWeeklyResult(req.body.weekID, req.body.winnerID, req.body.runnerUpID, req.body.bottomID, req.body.eliminatedID);
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
  submitWeeklyResult,
  sendRanking,
};
