const db = require('../database/db.js');
const bcrypt = require('bcrypt');

const salt = 10;

function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

function checkPassword(inputPassword, dbPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(inputPassword, dbPassword, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
}

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
      hashPassword(req.body.password)
      .then((hash) => {
        createUser(req.body.name, req.body.username, hash, req.body.email);
        // login and create a session
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
      checkPassword(req.body.password, user.password)
      .then((result) => {
        if (result) {
          // login and create a session
        } else { // password does not match
          res.send('correct');
        }
      });
    } else { // username is not in database
      res.send('incorrect');
    }
  });
}

module.exports = {
  signup,
  login,
};
