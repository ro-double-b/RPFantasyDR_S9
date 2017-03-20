const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const router = require('./routes.js');

const app = express();
const port = process.env.PORT || 3000;

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(cookieParser());
app.use(session({
  name: 'fdr-session-cookie-id',
  secret: '7988F3291',
  resave: true,
  saveUninitialized: true,
  secure: true,
}));

app.use(express.static(`${__dirname}./../client`));

app.use('/', router);

app.listen(port);
console.log(`Listening on port ${port}`);
