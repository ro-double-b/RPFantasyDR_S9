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

function createSession(req, res, user) {
  return req.session.regenerate(() => {
    req.session.user = user;
    res.redirect('/#/home');
  });
}

function hasSession(req) {
  if (req.session.user === undefined) {
    return false;
  } else {
    return true;
  }
}

function checkUser(req, res) {
  if (!hasSession(req)) {
    res.redirect('/#/login');
  } else {
    res.redirect('/#/home');
  }
}

function porcessing(req, res) {
  res.redirect('/#/processing');
}

function signup(req, res) {
  getUser(req.body.username)
  .then((user) => {
    if (user === null) { // username not taken
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
          res.redirect('/');
        } else {
          createUser(req.body.name, req.body.username, hash, req.body.email)
          .then(() => {
            createSession(req, res, req.body.username);
          });
        }
      });
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
          createSession(req, res, req.body.username);
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
  req.session.destroy((err) => {
    res.send('/login');
  });
}

function mobileView(req, res) {
  res.redirect('/#/mobile')
}

module.exports = {
  signup,
  login,
  checkUser,
  logout,
  mobileView,
  porcessing,
};
