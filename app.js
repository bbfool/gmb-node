var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    
    var message = 'Hosted in GitHub!  It works!',
        version = 'NodeJS ' + process.versions.node ,
        intentions = 'this is what we are going to do here ' + process.env.PORT,
        response = [message, intentions, version].join('\n');
    res.end(response);
});
server.listen();
