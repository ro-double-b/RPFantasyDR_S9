module.exports = {
  database: process.env.DATABASE_URL || 'RPFantasyDR',
  username: 'robb',
  password: 'AAeeII11',
  host: process.env.DATABASE_URL ? process.env.DATABASE_URL.split(':')[2] : 'localhost',
};
