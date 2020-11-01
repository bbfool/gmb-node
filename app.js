//var http = require('http');
const axios = require('axios');
var express = require('express');
var app = express();

// on the request to root (localhost:3000/)
/*
app.get('/', function (req, res) {
    console.log('received request');
    res.send('<b>My</b> first express http server');
});
*/

async function getWeatherAsync(zipCode) {
    try {
        weatherUrl = 'https://api.weather.gov/gridpoints/BOI/132,84/forecast';
      console.log('received request for zip: ' + zipCode)
        const response = await axios.get(weatherUrl);
      //console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

function getWeather(zipCode) {
    try {
        weatherUrl = 'https://api.weather.gov/gridpoints/BOI/132,84/forecast';
      console.log('received request for zip: ' + zipCode)
      return axios.get(weatherUrl)
    } catch (error) {
      console.error(error);
    }
  }

app.get('/api', function (req, res) {
    console.log('received request /api2');
    res.send('<b>My</b> first express http server');
});

app.get('/api/forecast-async', function(req, res)
{
    let zipCode = req.query.zipCode;
    if(!zipCode)
    {
        throw new Error('Zip code not provided');
        console.error('no zip code provided, cannot proceed!');
    }
    else{
        console.log('request sent to webservice, awaiting response data');
        getWeatherAsync(zipCode).then(function(response) {
            res.send(response);
            console.log('response received and sent');
    });
    }
});

app.get('/api/forecast', function(req, res)
{
    let zipCode = req.query.zipCode;
    if(!zipCode)
    {
        throw new Error('Zip code not provided');
        console.error('no zip code provided, cannot proceed!');
    }
    else{
        console.log('request sent to webservice, awaiting response data');
        getWeather(zipCode).then(function(response) {
            res.send(response.data);
            console.log('response received and sent');
        });
    }
});
/*
app.get('api2', function (req, res) {
    console.log('received request api2');
    res.send('<b>My</b> first express http server');
});
*/
if(process.env.NOT_PASSENGER)
{
    app.listen(3000);
}
else{
    app.listen('passenger');
}

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
