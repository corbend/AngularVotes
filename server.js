var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

app.use('/templates', express.static(__dirname + "/templates"));
app.use('/js', express.static(path.join(__dirname, '/js')));
app.use('/css', express.static(path.join(__dirname, '/css')));
app.use('/bower_components', express.static(path.join(__dirname, '/bower_components')));

var port = process.env.PORT || 3000;
var env = process.env.NODE_ENV || 'development';

app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
})

var server = http.createServer(app);
server.listen(port, function() {
	console.log("Server is running on port" + port)
});