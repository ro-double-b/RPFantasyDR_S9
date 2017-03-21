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

const Users = db.define('users', {
  name: Sequelize.STRING,
  username: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});

const Teams = db.define('teams', {
  teamname: Sequelize.STRING,
  teamPassword: Sequelize.STRING,

});

const UserSelections = db.define('selections', {
  username: Sequelize.STRING,
  weekID: Sequelize.INTEGER,
  weeklyWinnerID: Sequelize.INTEGER,
  weeklyRunnerUpID: Sequelize.INTEGER,
  weeklyBottomID: Sequelize.INTEGER,
  weeklyEliminatedID: Sequelize.INTEGER,
  tootSelectionArr: Sequelize.ARRAY(Sequelize.BOOLEAN),
  finalWinnerID: Sequelize.INTEGER,
  finalRunnerUpID: Sequelize.INTEGER,
  finalTopThreeID: Sequelize.INTEGER,
  finalConID: Sequelize.INTEGER,
});

const Results = db.define('results', {
  weekID: Sequelize.INTEGER,
  weeklyWinnerID: Sequelize.INTEGER,
  weeklyRunnerUpID: Sequelize.INTEGER,
  weeklyBottomID: Sequelize.INTEGER,
  weeklyEliminatedID: Sequelize.INTEGER,
  tootRavenSelectionArr: Sequelize.ARRAY(Sequelize.BOOLEAN),
  tootRajaSelectionArr: Sequelize.ARRAY(Sequelize.BOOLEAN),
  finalWinnerID: Sequelize.INTEGER,
  finalRunnerUpID: Sequelize.INTEGER,
  finalTopThreeID: Sequelize.INTEGER,
  finalConID: Sequelize.INTEGER,
});

const UserTotals = db.define('userTotals', {
  username: Sequelize.STRING,
  weeklyTotalsArr: Sequelize.ARRAY(Sequelize.INTEGER),
  tootTotalsArr: Sequelize.ARRAY(Sequelize.INTEGER),
  finalTotalsArry: Sequelize.INTEGER,
  totalPoints: Sequelize.INTEGER,
  ranking: Sequelize.INTEGER,
});

const TeamTotals = db.define('teamTotals', {
  teamname: Sequelize.STRING,
  weeklyTotalsArr: Sequelize.ARRAY(Sequelize.INTEGER),
  tootTotalsArr: Sequelize.ARRAY(Sequelize.INTEGER),
  finalTotalsArr: Sequelize.INTEGER,
  totalPoints: Sequelize.INTEGER,
  ranking: Sequelize.INTEGER,
});

const TeamMessages = db.define('teamMessages', {
  teamname: Sequelize.STRING,
  username: Sequelize.STRING,
  message: Sequelize.STRING,
});

const Messages = db.define('messages', {
  username: Sequelize.STRING,
  message: Sequelize.STRING,
});

const UsersTeams = db.define('user_teams', {
  username: Sequelize.STRING,
  teamname: Sequelize.STRING,
});

Users.hasOne(UserTotals, {
  // foreignKey: 'username',
});

Teams.hasOne(TeamTotals, {
  // foreignKey: 'teamname',
});

Users.hasOne(Messages, {
  // foreignKey: 'username',
});


Users.belongsToMany(Teams, {
  as: 'UsersTeams',
  through: 'user_teams',
  // foreignKey: 'teamname',
});

Teams.belongsToMany(Users, {
  through: 'UsersTeams',
  // through: 'user_teams',
  // foreignKey: 'username',
});

Users.belongsToMany(Teams, {
  through: 'UsersTeams',
  // through: 'user_teams',
  // foreignKey: 'teamname',
});

Teams.belongsToMany(Users, {
  as: 'TeamsUsers',
  through: 'user_teams',
  // foreignKey: 'username',
});


Users.hasOne(UserSelections, {
  // foreignKey: 'username',
});

Users.belongsToMany(Teams, {
  as: 'TeamMessagesSent',
  through: 'user_teams_messages',
  // foreignKey: 'username',
});

Teams.belongsToMany(Users, {
  as: 'TeamMessages',
  through: 'user_teams_messages',
  // foreignKey: 'username',
});


Users.sync();
Teams.sync();
UserSelections.sync();
Results.sync();
UserTotals.sync();
TeamTotals.sync();
TeamMessages.sync();
Messages.sync();
UsersTeams.sync();

module.exports = {
  Results,
  UserSelections,
  TeamMessages,
  Teams,
  UserTotals,
  Users,
  TeamTotals,
  Messages,
  UsersTeams,
};
