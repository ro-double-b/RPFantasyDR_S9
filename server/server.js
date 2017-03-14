const express = require('express');
const bodyParser = require('body-parser');
const router = require('./routes.js');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(`${__dirname}./../client`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// app.use('/scripts', express.static(`${__dirname}./../node_modules`));

// app.get('/', (req, res) => {
  // res.send('./../client');
// });
app.use('/', router);

app.listen(port);
console.log(`Listening on port ${port}`);

