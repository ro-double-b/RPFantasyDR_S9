var express = require('express')
var app = express()

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + './../client'))
app.use('/scripts', express.static(__dirname + './../node_modules'))

app.get('/', function(req, res) {

    res.send('./../client');
});

app.listen(port, function () {

  console.log('Example app listening on port 3000!')
})