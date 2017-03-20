const Sequelize = require('sequelize');
const config = require('./config');
const db = new Sequelize(config.database, config.username, config.password, {
  protocol: 'postgres',
  dialect: 'postgres',
  host: config.host,
  logging: false,
});

// , config.username, config.password

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
  groups: Sequelize.ARRAY(Sequelize.STRING),
});

const Selection = db.define('selection', {
  username: Sequelize.STRING,
  weekID: Sequelize.INTEGER,
  winnerID: Sequelize.INTEGER,
  runnerUpID: Sequelize.INTEGER,
  bottomID: Sequelize.INTEGER,
  eliminatedID: Sequelize.INTEGER,
});

const TopThree = db.define('topthreeselection', {
  username: Sequelize.STRING,
  winnerTopThreeID: Sequelize.INTEGER,
  runnerUpTopThreeID: Sequelize.INTEGER,
  topThreeID: Sequelize.INTEGER,
});

const TootBoot = db.define('tootselection', {
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

const TopThreeResults = db.define('topresults', {
  topThreeInit: Sequelize.INTEGER,
  winnerTopThreeID: Sequelize.INTEGER,
  runnerUpTopThreeID: Sequelize.INTEGER,
  topThreeID: Sequelize.INTEGER,
});

const TootBootResults = db.define('tootresults', {
  weekID: Sequelize.INTEGER,
  selectionRaven: Sequelize.ARRAY(Sequelize.BOOLEAN),
  selectionRaja: Sequelize.ARRAY(Sequelize.BOOLEAN),
});
const Totals = db.define('totals', {
  username: Sequelize.STRING,
  totals: Sequelize.ARRAY(Sequelize.INTEGER),
  tootTotals: Sequelize.ARRAY(Sequelize.INTEGER),
  finalTotals: Sequelize.INTEGER,
  sumTotal: Sequelize.INTEGER,
  tootsumTotals: Sequelize.INTEGER,
  finalsumTotals: Sequelize.INTEGER,
  ranking: Sequelize.INTEGER,
});

User.sync();
Selection.sync();
TopThree.sync();
TootBoot.sync();
Results.sync();
TopThreeResults.sync();
TootBootResults.sync();
Totals.sync();

module.exports = {
  User,
  Selection,
  TopThree,
  TootBoot,
  Results,
  TopThreeResults,
  TootBootResults,
  Totals,
};
