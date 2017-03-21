const db = require('../database/db.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

function createTeam(req, res) {
  getTeam(req.body.teamname)
  .then((team) => {
    if (team === null) {
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          res.redirect('/');
        } else {
          joinTeam(req, res)
          .then(() => {
            res.send('correct');
          });
        }
      });
    } else {
      res.send('incorrect');
    }
  });
}

function joinTeam(req, res) {
  getTeam(req.body.teamname)
  .then((team) => {
    if (team !== null) {
      bcrypt.compare(req.body.password, team.password, (err, hash) => {
        if (err) {
          throw err;
        } else {
          createTeam(req, res);
        }
      });
    } else {
      res.send('incorrect');
    }
  });
}

function getTeam(teamname) {
  return db.Teams.findOne({
    where: {
      teamname,
    },
  });
}

module.exports = {
  createTeam,
  joinTeam,
}
