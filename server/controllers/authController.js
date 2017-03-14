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
  const user = req.body;
  createUser(user.name, user.username, user.password, user.email);
}

function login(req, res) {
}

module.exports = {
  signup,
  login,
};
