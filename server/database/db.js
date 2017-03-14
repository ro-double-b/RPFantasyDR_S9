const Sequelize = require('sequelize');
const config = require('./config');
const db = new Sequelize(config.database, config.username, config.password, {
  protocol: 'postgres',
  dialect: 'postgres',
  host: config.host,
});

db.authenticate().then((err) => {
  console.log('Connection has been established');
}).catch((err) => {
  console.log('undable to connect to the database', err);
})

// const User = db.define('user', {
//   username: Sequelize.STRING,
//   password: Sequelize.STRING,
// });

// const Message = db.define('message', {
//   url: Sequelize.STRING,
//   type: Sequelize.STRING,
// });

// // Setup User Message relationship
// Message.belongsTo(User, {as: 'Sender'});
// Message.belongsTo(User, {as: 'Receiver'});
// User.hasMany(Message, { foreignKey: 'SenderId' });
// User.hasMany(Message, { foreignKey: 'ReceiverId' });

// const Question = db.define('question', {
//   txt: Sequelize.STRING,
//   // Allow for certain users to receive specific questions
//   // receiverId: Sequelize.INTEGER
// });

// // Allow for users to create questions, setup relationship between user and questions
// // Question.belongsTo(User);
// // User.hasMany(Question);

// User.sync();
// Message.sync();
// Question.sync();

// module.exports = {
//   User,
//   Message,
//   Question,
// };