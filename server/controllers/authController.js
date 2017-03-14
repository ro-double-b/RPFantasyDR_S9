const db = require('../database/db.js');

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
      createUser(req.body.name, req.body.username, req.body.password, req.body.email);
      // login and create a session
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
      if (user.dataValues.password === req.body.password) { // password matches
        // login and create a session
        res.send('correct');
      } else { // password does not match
        res.send('incorrect');
      }
    } else { // username is not in database
      res.send('incorrect');
    }
  });
}

module.exports = {
  signup,
  login,
};
