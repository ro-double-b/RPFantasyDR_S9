var express = require('express')
var app = express()

var port = 5002

app.use(express.static(__dirname + '/client'))

app.listen(port)
