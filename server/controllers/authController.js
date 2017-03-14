const db = require('../database/db.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

function createUser(name, username, password, email) {
  return db.User.create({
    name,
    username,
    password,
    email,
  });
}

function getUser(username) {
  return db.User.findOne({
    where: {
      username,
    },
  });
}

function signup(req, res) {
  getUser(req.body.username)
  .then((user) => {
    if (user === null) { // username not taken
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          throw err;
        } else {
          createUser(req.body.name, req.body.username, hash, req.body.email);
        }
      });
      res.send('correct');
    } else { // username is taken
      res.send('incorrect');
    }
  });
}

function login(req, res) {
  getUser(req.body.username)
  .then((user) => {
    if (user !== null) { // user is in database
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          throw err;
        } else if (result) {
          res.send('correct');
        } else {
          res.send('incorrect');
        }
      })
    } else { // username is not in database
      res.send('incorrect');
    }
  });
}

module.exports = {
  signup,
  login,
};
