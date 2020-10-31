var http = require('http');
var express = require('express');
var app = express();

// on the request to root (localhost:3000/)
/*
app.get('/', function (req, res) {
    console.log('received request');
    res.send('<b>My</b> first express http server');
});
*/

app.get('/api', function (req, res) {
    console.log('received request /api2');
    res.send('<b>My</b> first express http server');
});
/*
app.get('api2', function (req, res) {
    console.log('received request api2');
    res.send('<b>My</b> first express http server');
});
*/
app.listen('passenger');

console.log('running with key' + process.env.KEY);
console.log('Example app listening on port.');

/*
app.listen(function () {
    console.log('running with key' + process.env.KEY);
    console.log('Example app listening on port.');
});


var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    var message = 'Hosted in GitHub!  It works!',
        version = 'NodeJS ' + process.versions.node ,
        intentions = 'this is what we are going to do here ' + process.env.NODE_ENV + '\n asdf ' + process.env.KEY,
        response = [message, intentions, version].join('\n');
    res.end(response);
});
server.listen();


console.log('server running' + server.address());
console.log(server.address());
console.log(server.address().address);
console.log(server.address().port);
console.log(server);
*/
