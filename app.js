var http = require('http');
var express = require('express');
var app = express();

// on the request to root (localhost:3000/)
app.get('/', function (req, res) {
    res.send('<b>My</b> first express http server');
});

app.listen(function () {
    console.log('running with key' + process.env.KEY);
    console.log('Example app listening on port.');
});

/*
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    var message = 'Hosted in GitHub!  It works!',
        version = 'NodeJS ' + process.versions.node ,
        intentions = 'this is what we are going to do here ' + process.env.PORT,
        response = [message, intentions, version].join('\n');
    res.end(response);
});
server.listen();
*/
