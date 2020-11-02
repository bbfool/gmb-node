import express from 'express';
import { getWeatherForecastByZip } from './weatherService.js'

var app = express();


app.get('/api', function (req, res) {
    console.log('received request /api2');
    res.send('<b>My</b> first express http server');
});

app.get('/api/forecast', function(req, res)
{
    let zipCode = req.query.zipCode;
    if(!zipCode)
    {
        throw new Error('Zip code not provided');
    }
    else{
        console.log('request sent to webservice, awaiting response data');

        getWeatherForecastByZip(zipCode)
        .then(forecast => {
            res.send(forecast.data)
        })
        .catch(error => {
            console.error(error);
            res.status(500).send('unable to retrieve forcast data, try again later.');
        }
            
            );
    }
});

if(process.env.NOT_PASSENGER)
{
    app.listen(3000);
}
else{
    app.listen('passenger');
}

console.log('running with key' + process.env.KEY);
console.log('Example app listening on port.');