const Sequelize = require('sequelize');
const config = require('./config');
const db = new Sequelize(config.database, config.username, config.password, {
  protocol: 'postgres',
  dialect: 'postgres',
  host: config.host,
  logging: false,
});

// 

// uncomment below to test the connection
db.authenticate().then((err) => {
  console.log('Postgres connection has been established');
}).catch((err) => {
  console.log('undable to connect to the database', err);
});

const User = db.define('user', {
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

const Selection = db.define('selection', {
  username: Sequelize.STRING,
  weekID: Sequelize.INTEGER,
  winnerID: Sequelize.INTEGER,
  runnerUpID: Sequelize.INTEGER,
  bottomID: Sequelize.INTEGER,
  eliminatedID: Sequelize.INTEGER,
});

const TopThree = db.define('selection', {
  username: Sequelize.STRING,
  winnerTopThreeID: Sequelize.INTEGER,
  runnerUpTopThreeID: Sequelize.INTEGER,
  topThreeID: Sequelize.INTEGER,
});

const TootBoot = db.define('selection', {
  username: Sequelize.STRING,
  weekID: Sequelize.INTEGER,
  selection: Sequelize.ARRAY(Sequelize.BOOLEAN),
});

const Results = db.define('results', {
  weekID: Sequelize.INTEGER,
  winnerID: Sequelize.INTEGER,
  runnerUpID: Sequelize.INTEGER,
  bottomID: Sequelize.INTEGER,
  eliminatedID: Sequelize.INTEGER,
});

const Totals = db.define('totals', {
  username: Sequelize.STRING,
  totals: Sequelize.ARRAY(Sequelize.INTEGER),
  sumTotal: Sequelize.INTEGER,
});

User.sync();
Selection.sync();
TopThree.sync();
TootBoot.sync();
Results.sync();
Totals.sync();

module.exports = {
  User,
  Selection,
  TopThree,
  TootBoot,
  Results,
  Totals,
};
