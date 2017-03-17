const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const router = require('./routes.js');

const app = express();
const port = process.env.PORT || 3000;

console.log(process.env.DATABASE_URL, '============================================================================================================================================================================================================================================================================================================================================================================================================================================================================');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(`${__dirname}./../client`));

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

app.use('/', router);

app.listen(port);
console.log(`Listening on port ${port}`);

// app.use('/scripts', express.static(`${__dirname}./../node_modules`));

// app.get('/', (req, res) => {
  // res.send('./../client');
// });

var pg = require('pg');


pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  //  console.log(err+"!!!!!!!!!!!!!!!");
  // client.query('SELECT * FROM your_table', function(err, result) {
  //   done();
  //   if(err) return console.error(err);
  //   console.log(result.rows);
  // });
});