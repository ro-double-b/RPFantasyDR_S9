const express = require('express');
const session = require('express-session')
const bodyParser = require('body-parser');
const router = require('./routes.js');

const app = express();
const port = process.env.PORT || 3000;



app.use(session({
  name: 'fdr-session-cookie-id',
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  // secure: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(`${__dirname}./../client`));


app.use('/', router);

app.listen(port);
console.log(`Listening on port ${port}`);
