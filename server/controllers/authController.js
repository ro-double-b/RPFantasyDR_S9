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

// function createSession(req, res, user) {
//   return req.session.regenerate(() => {
//     req.session.user = user;
//     res.send('/home');
//   });
}

function hasSession(req) {
  return req.session ? !req.session.user : false;
}

function checkUser(req, res) {
  console.log('req');
  if (!hasSession(req)) {
    res.redirect('/');
  } else {
    res.redirect('/');
  }
}

function signup(req, res) {
  getUser(req.body.username)
  .then((user) => {
    if (user === null) { // username not taken
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          throw err;
        } else {
          createUser(req.body.name, req.body.username, hash, req.body.email)
          .then((userObj) => {
            // createSession(req, res, userObj);
          });
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
          // createSession(req, res, user);
        } else {
          res.send('incorrect');
        }
      });
    } else { // username is not in database
      res.send('incorrect');
    }
  });
}

function logout(req, res) {
  req.session.regenerate((err) => {
    res.send('/');
  });
}

module.exports = {
  signup,
  login,
  checkUser,
  logout,
};
