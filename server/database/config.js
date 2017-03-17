module.exports = {
  database: process.env.DATABASE_URL || 'RPFantasyDR',
  username: 'xzqklqevjsyqoy',
  password: '611387d0a04c586d81c960b23c5ecb5f85b051fbe1f8fadf5aa3cb4c28fd7483',
  host: process.env.DATABASE_URL ? process.env.DATABASE_URL.split(':')[2] : 'localhost',
};
