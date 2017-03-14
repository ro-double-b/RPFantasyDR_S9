const db = require('../database/db.js');

function createUser(name, username, password, email) {
  return db.User.create({
    name,
    username,
    password,
    email,
  });
}

function signup(req, res) {
  console.log(req.body)
}

function login(req, res) {
  console.log(req.body)
}

module.exports = {
  signup,
  login,
};
