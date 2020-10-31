var http = require('http');
var server = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    var message = 'Hosted in GitHub!  It works!\n',
        version = 'NodeJS ' + process.versions.node + '\n',
        intentions = 'this is what we are going to do here',
        response = [message, intentions, version].join('\n');
    res.end(response);
});
server.listen();
