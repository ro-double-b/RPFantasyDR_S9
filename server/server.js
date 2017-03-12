var express = require('express')
var app = express()

var port = process.env.PORT || 8080;

app.use(express.static(__dirname + './../client'))

app.get('/', function(req, res) {

    // ejs render automatically looks in the views folder
    res.render('index');
});

app.listen(3000, function () {

  console.log('Example app listening on port 3000!')
})