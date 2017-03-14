const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const controllers = require('./controllers.js');

const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());
app.use(express.static(`${__dirname}./../client`));
// app.use('/scripts', express.static(`${__dirname}./../node_modules`));

// app.get('/', (req, res) => {
//   res.send('./../client');
// });

app.post('/login', controllers.login);
app.post('/signup', controllers.signup);

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
