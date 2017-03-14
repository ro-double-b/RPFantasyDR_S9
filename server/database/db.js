const Sequelize = require('sequelize');
const config = require('./config');
const db = new Sequelize(config.database, config.username, config.password, {
  protocol: 'postgres',
  dialect: 'postgres',
  host: config.host,
  logging: false,
});

// uncomment below to test the connection
db.authenticate().then((err) => {
  console.log('Postgres connection has been established');
}).catch((err) => {
  console.log('undable to connect to the database', err);
})

const User = db.define('user', {
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

User.sync();

module.exports = {
  User,
};
