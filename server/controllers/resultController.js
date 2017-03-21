const db = require('../database/db.js');
const weeklyPoints = 25;
const tootPoints = 5;
const eliminated = [true, false, false, false, false, false, false, false, false, false, false, false, false];
const topThreePoints = 100;
const winnerPoints = 100;

// send results to the client side
// will need to update based on if there are massive amounts of users
function sendRanking(req, res) {
  getRanking()
  .then((ranking) => {
    res.send(ranking);
  });
}

function getRanking() {
  return db.Totals.findAll();
}

// submit weekly results
function getWeeklyResult(weekID) {
  return db.Results.findOne({
    where: {
      weekID,
    },
  });
}

function submitWeeklyResult(req, res) {
  getWeeklyResult(req.body.weekID)
  .then((entry) => {
    if (entry === null) {
      createWeeklyResult(req.body.weekID, req.body.winnerID, req.body.runnerUpID, req.body.bottomID, req.body.eliminatedID)
      .then(() => {
        updateWeeklyTotals(res);
      });
    } else {
      entry.updateAttributes({
        winnerID: req.body.winnerID,
        runnerUpID: req.body.runnerUpID,
        bottomID: req.body.bottomID,
        eliminatedID: req.body.eliminatedID,
      })
      .then(() => {
        updateWeeklyTotals(res);
      });
    }
  });
}

function createWeeklyResult(weekID, winnerID, runnerUpID, bottomID, eliminatedID) {
  return db.Results.create({
    weekID,
    weeklyWinnerID: winnerID,
    weeklyRunnerUpID: runnerUpID,
    weeklyBottomID: bottomID,
    weeklyEliminatedID: eliminatedID,
  });
}

function getWeeklyResults() {
  return db.Results.findAll();
}

function getUsers() {
  return db.Users.findAll({
  });
}
function getUserWeeklySelection(username) {
  return db.Selection.findAll({
    where: {
      username,
    },
  });
}

function updateWeeklyTotals(res) {
  getWeeklyResults()
  .then((allResults) => {
    getUsers() // get every user
    .then((allUsers) => {
      allUsers.forEach((user) => { // iterate over each user
        const username = user.dataValues.username;
        const total = [];
        getUserWeeklySelection(username)
        .then((allUserSelectionsArr) => {
          allResults.forEach((weeklyResult, weekIndex) => {
            allUserSelectionsArr.forEach((oneUserWeekSelection) => {
              let weeklyTotal = 0;
              const oneWeekResult = weeklyResult.dataValues;
              const oneUserSelect = oneUserWeekSelection.dataValues;
              // check to make srue the week is correct
              if (oneWeekResult.weekId === oneUserSelect.weekId) {
                // check to see if you guessed correctily
                if (oneWeekResult.weeklyWinnerID === oneUserSelect.weeklyWinnerID) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (oneWeekResult.weeklyRunnerUpID === oneUserSelect.weeklyRunnerUpID) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (oneWeekResult.weeklyBottomID === oneUserSelect.weeklyBottomID) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
                if (oneWeekResult.weeklyEliminatedID === oneUserSelect.weeklyEliminatedID) {
                  weeklyTotal = weeklyTotal + weeklyPoints;
                }
              }
              total[weekIndex] = weeklyTotal;
            });
          });
        });
        getTotal(username)
        .then((entry) => {
          const newSumTotal = total.reduce((a, b) => {
            return a + b;
          }, 0);
          if (entry === null) {
            createWeeklyTotal(username, total, newSumTotal)
            .then(() => {
              res.send('submitted');
            });
          } else {
            entry.updateAttributes({
              totals: total,
              sumTotal: newSumTotal,
            })
            .then(() => {
              res.send('submitted');
            });
          }
        });
      });
    });
  });
}

function getTotal(username) {
  return db.UserTotals.findOne({
    where: {
      username,
    },
  });
}

function createWeeklyTotal(username, totalArr, sumTotal) {
  return db.Totals.create({
    username,
    totals: totalArr,
    sumTotal,
  });
}

function submitFinalsResult(req, res) {
  getFinalsResult()
  .then((entry) => {
    if (entry === null) {
      createFinalsResult(req.body.winnerID, req.body.runnerUpID, req.body.topThreeID, req.body.conID)
      .then(() => {
        updateFinalsTotals(res);
      });
    } else {
      entry.updateAttributes({
        winnerTopThreeID: req.body.winnerID,
        runnerUpTopThreeID: req.body.runnerUpID,
        topThreeID: req.body.topThreeID,
      })
      .then(() => {
        updateFinalsTotals(res);
      });
    }
  });
}

function getFinalsResult() {
  return db.Results.findOne({
    where: {
      finalWinnerID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalRunnerUpID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalTopThreeID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalConID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
  });
}
function createFinalsResult(finalWinnerID, finalRunnerUpID, finalTopThreeID, finalConID) {
  return db.Results.create({
    finalWinnerID,
    finalRunnerUpID,
    finalTopThreeID,
    finalConID,
  });
}

function updateFinalsTotals(res) {
  getFinalsResult()
  .then((allResults) => {
    getUsers() // get every user
    .then((allUsers) => {
      allUsers.forEach((user) => { // iterate over each user
        const username = user.dataValues.username;
        getUserFinalsSelection(username)
        .then((finalUserSelection) => {
          let total = 0;
          const userFinalSelectionObj = finalUserSelection[0].dataValues;
          const finalResultObj = allResults[0].dataValues;
          if (userFinalSelectionObj.winnerTopThreeID === finalResultObj.winnerTopThreeID) {
            total = total + winnerPoints;
          }
          if (userFinalSelectionObj.winnerTopThreeID === finalResultObj.winnerTopThreeID ||
              userFinalSelectionObj.winnerTopThreeID === finalResultObj.runnerUpTopThreeID ||
              userFinalSelectionObj.winnerTopThreeID === finalResultObj.topThreeID) {
            total = total + topThreePoints;
          }
          if (userFinalSelectionObj.runnerUpTopThreeID === finalResultObj.winnerTopThreeID ||
              userFinalSelectionObj.runnerUpTopThreeID === finalResultObj.runnerUpTopThreeID ||
              userFinalSelectionObj.runnerUpTopThreeID === finalResultObj.topThreeID) {
            total = total + topThreePoints;
          }
          if (userFinalSelectionObj.topThreeID === finalResultObj.winnerTopThreeID ||
              userFinalSelectionObj.topThreeID === finalResultObj.runnerUpTopThreeID ||
              userFinalSelectionObj.topThreeID === finalResultObj.topThreeID) {
            total = total + topThreePoints;
          }
          if (userFinalSelectionObj.finalConID === finalResultObj.finalConID) {
            total = total + topThreePoints;
          }
          getTotal(username)
          .then((entry) => {
            if (entry === null) {
              createFinalTotal(username, total)
              .then(() => {
                res.send('submitted');
              });
            } else {
              entry.updateAttributes({
                finalTotalsArr: total,
              })
              .then(() => {
                res.send('submitted');
              });
            }
          });
        });
      });
    });
  });
}

function getUserFinalsSelection(username) {
  return db.Results.findAll({
    where: {
      finalWinnerID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalRunnerUpID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalTopThreeID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
      finalConID: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
    },
  });
}

function createFinalTotal(username, total) {
  return db.Totals.create({
    username,
    finalTotals: total,
    sumTotal: total,
  });
}

/////////////////////////////////////////////////////////////////

function submitTootResult(req, res) {
  getTootResult(req.body.weekID)
  .then((entry) => {
    if (entry === null) {
      createTootResult(req.body.weekID, req.body.selectionRaven, req.body.selectionRaja)
      .then(() => {
        updateTootTotals(res);
      });
    } else {
      entry.updateAttributes({
        selectionRaven: req.body.selectionRaven,
        selectionRaja: req.body.selectionRaja,
      })
      .then(() => {
        updateTootTotals(res);
      });
    }
  });
}
function getTootResult(weekID) {
  return db.Results.findOne({
    where: {
      weekID,
    },
  });
}

function createTootResult(weekID, tootRavenSelectionArr, tootRajaSelectionArr) {
  return db.Results.create({
    weekID,
    tootRavenSelectionArr,
    tootRajaSelectionArr,
  });
}
function updateTootTotals(res) {
  getTootResults()
  .then((allResults) => {
    getUsers() // get every user
    .then((allUsers) => {
      allUsers.forEach((user) => { // iterate over each user
        const username = user.dataValues.username;
        const total = [];
        getUserTootSelection(username)
        .then((selections) => {
          allResults.forEach((weekResult, tootIndex) => {
            let weeklyTotal = 0;
            selections.forEach((weekUserSelection) => {
              // check to see if weeks match
              if (weekResult.dataValues.weekID === weekUserSelection.dataValues.weekID) {
                weekUserSelection.dataValues.selection.forEach((singleUserToot, indexWeek) => {
                  if (!eliminated[indexWeek]) {
                    if (singleUserToot === weekResult.selectionRaven[indexWeek]) {
                      weeklyTotal = weeklyTotal + tootPoints;
                    }
                    if (singleUserToot === weekResult.selectionRaja[indexWeek]) {
                      weeklyTotal = weeklyTotal + tootPoints;
                    }
                  }
                });
              }
            });
            total[tootIndex] = weeklyTotal;
          });
        });
        getTotal(username)
        .then((entry) => {
          const newSumTotal = total.reduce((a, b) => {
            return a + b;
          }, 0);
          if (entry === null) {
            createTootTotal(username, total, newSumTotal)
            .then(() => {
              res.send('submitted');
            });
          } else {
            entry.updateAttributes({
              tootTotals: total,
              tootsumTotals: newSumTotal,
            })
            .then(() => {
              res.send('submitted');
            });
          }
        });
      });
    });
  });
}


function getTootResults() {
  return db.Results.findAll();
}

function getUserTootSelection(username) {
  return db.Results.findAll({
    where: {
      username,
    },
  });
}
function createTootTotal(username, totalArr, sumTotal) {
  return db.UserTotals.create({
    username,
    tootTotalsArr: totalArr,
  });
}

module.exports = {
  submitWeeklyResult,
  sendRanking,
  submitTootResult,
  submitFinalsResult,
};
