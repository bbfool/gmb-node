var express = require('express');
var router = express.Router();
const weatherService = require('../weather/weatherService.js')

router.get('/forecast', function(req, res)
{
    let zipCode = req.query.zipCode;
    if(!zipCode)
    {
        throw new Error('Zip code not provided');
    }
    else{
        console.log('request sent to webservice, awaiting response data');

        weatherService.getWeatherForecastByZip(zipCode)
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

module.exports = router;