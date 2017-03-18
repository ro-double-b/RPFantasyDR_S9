const db = require('../database/db.js');
const weeklyPoints = 25;
const tootPoints = 5;
const weeks = 13;
const eliminated = [false, false, false, false, false, false, false, false, false, false, false, false, false];
const topThreePoints = 100;
const winnerPoints = 100;

function getWeeklyResult(weekID) {
  return db.Results.findOne({
    where: {
      weekID,
    },
  });
}

function getTootResult(weekID) {
  return db.TootBootResults.findOne({
    where: {
      weekID,
    },
  });
}

function getTopThreeResult() {
  return db.TopThreeResults.findOne({
    where: {
      topThreeInit: 1,
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

function createTopThreeResult(winnerTopThreeID, runnerUpTopThreeID, topThreeID) {
  return db.TopThreeResults.create({
    topThreeInit: 1,
    winnerTopThreeID,
    runnerUpTopThreeID,
    topThreeID,
  });
}

function createTootResult(weekID, selectionRaven, selectionRaja) {
  return db.TootBootResults.create({
    weekID,
    selectionRaven,
    selectionRaja,
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

function formatTootTotals(totalArr) {
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

function createTootTotal(username, totalArr, sumTotal) {
  return db.Totals.create({
    username,
    tootTotals: totalArr,
    sumTotal,
  });
}

function createTopThreeTotal(username, total) {
  return db.Totals.create({
    username,
    finalTotals: total,
    sumTotal: total,
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

function getUserTootSelection(username) {
  return db.TootBoot.findAll({
    where: {
      username,
    },
  });
}

function getUserTopThreeSelection(username) {
  return db.TopThree.findAll({
    where: {
      username,
    },
  });
}

function getWeeklyResults() {
  return db.Results.findAll();
}

function getTopThreeResults() {
  return db.TopThreeResults.findAll();
}


function getTootResults() {
  return db.TootBootResults.findAll();
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

function updateWeeklyTotals() {
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
          const newSumTotal = total.reduce((a, b) => {
            return a + b;
          }, 0);
          if (entry === null) {
            createWeeklyTotal(userValue, formatWeeklyTotals(total), newSumTotal);
          } else {
            const totalSumTotal = entry.dataValues.sumTotal + newSumTotal;
            entry.updateAttributes({
              totals: formatWeeklyTotals(total),
              sumTotal: totalSumTotal,
            });
          }
        });
      });
    });
  });
}

function updateTopThreeTotals() {
  getTopThreeResults()
  .then((results) => {
    getUsers() // get every user
    .then((users) => {
      users.forEach((user, index) => { // iterate over each user
        const userValue = user.dataValues.username;
        getUserTopThreeSelection(userValue)
        .then((selection) => {
          let total = 0;
          if (selection.dataValue.winnerTopThreeID === results.dataValue.winnerTopThreeID) {
            total = total + winnerPoints;
          }
          if (selection.dataValue.winnerTopThreeID === results.dataValue.winnerTopThreeID ||
              selection.dataValue.winnerTopThreeID === results.dataValue.runnerUpID ||
              selection.dataValue.winnerTopThreeID === results.dataValue.topThreeID) {
            total = total + topThreePoints;
          }
          if (selection.dataValue.runnerUpTopThreeID === results.dataValue.winnerTopThreeID ||
              selection.dataValue.runnerUpTopThreeID === results.dataValue.runnerUpID ||
              selection.dataValue.runnerUpTopThreeID === results.dataValue.topThreeID) {
            total = total + topThreePoints;
          }
          if (selection.dataValue.topThreeID === results.dataValue.winnerTopThreeID ||
              selection.dataValue.topThreeID === results.dataValue.runnerUpID ||
              selection.dataValue.topThreeID === results.dataValue.topThreeID) {
            total = total + topThreePoints;
          }
          getTotal(userValue)
          .then((entry) => {
            if (entry === null) {
              createTopThreeTotal(userValue, total);
            } else {
              const totalSumTotal = entry.dataValues.sumTotal + total;
              entry.updateAttributes({
                finalTotals: total,
                sumTotal: totalSumTotal,
              });
            }
          });
        });
      });
    });
  });
}

function updateTootTotals() {
  getTootResults()
  .then((results) => {
    getUsers() // get every user
    .then((users) => {
      users.forEach((user, index) => { // iterate over each user
        const userValue = user.dataValues.username;
        const total = [];
        getUserTootSelection(userValue)
        .then((selections) => {
          results.forEach((weekResult) => {
            selections.forEach((weekUserSelection) => {
              let weeklyTotal = 0;
              // check to see if weeks match
              if (weekResult.dataValues.weekID === weekUserSelection.dataValues.weekID) {
                weekUserSelection.forEach((singleUserToot, indexWeek) => {
                  if (!eliminated[indexWeek]) {
                    weekResult.selectionRaven.forEach((singleRavenToot) => {
                      if (singleUserToot === singleRavenToot) {
                        weeklyTotal = weeklyTotal + tootPoints;
                      }
                    });
                    weekResult.selectionRaja.forEach((singleRajaToot) => {
                      if (singleUserToot === singleRajaToot) {
                        weeklyTotal = weeklyTotal + tootPoints;
                      }
                    });
                  }
                });
              }
              total.push(weeklyTotal);
            });
          });
        });
        getTotal(userValue)
        .then((entry) => {
          const newSumTotal = total.reduce((a, b) => {
            return a + b;
          }, 0);
          if (entry === null) {
            createTootTotal(userValue, formatTootTotals(total), newSumTotal);
          } else {
            const totalSumTotal = entry.dataValues.sumTotal + newSumTotal;
            entry.updateAttributes({
              tootTotals: formatTootTotals(total),
              sumTotal: totalSumTotal,
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
    updateWeeklyTotals();
    res.send('submitted');
  });
}

function submitTootResult(req, res) {
  console.log(req.body)
  getTootResult(req.body.weekID)
  .then((entry) => {
    if (entry === null) {
      createTootResult(req.body.weekID, req.body.selectionRaven, req.body.selectionRaja);
    } else {
      entry.updateAttributes({
        selectionRaven: req.body.selectionRaven,
        selectionRaja: req.body.selectionRaja,
      });
    }
    updateTootTotals();
    res.send('submitted');
  });
}

function submitTopThreeResult(req, res) {
  getTopThreeResult()
  .then((entry) => {
    if (entry === null) {
      createTopThreeResult(req.body.winnerID, req.body.runnerUpID, req.body.topThreeID);
    } else {
      entry.updateAttributes({
        winnerTopThreeID: req.body.winnerID,
        runnerUpTopThreeID: req.body.runnerUpID,
        topThreeID: req.body.topThreeID,
      });
    }
    updateTopThreeTotals();
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
  submitTootResult,
  submitTopThreeResult,
};
