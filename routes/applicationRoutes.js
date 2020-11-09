var express = require('express');
var router = express.Router();
const weatherService = require('../weather/weatherService.js')
const googleService = require('../weather/googleServices.js');
const { response } = require('express');
const { google } = require('googleapis');

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

router.get('/google', function(req, res)
{

    googleService.checkAuthToken()
    .then(response => {
        res.send(response);});
    
    /* .then(response => res.send(response))
    .catch(badResult => {
        console.error(badResult);
        res.status(500).send(`Error with account retrieval. ${badResult}`); */
        //throw new Error(`error with weather retrieval ${badResult}`);
    //});
//    res.send(googleService.checkAuthToken());
});

router.get("/google/callback", function(request, response)
{
    googleService.handleResponseToken(request.query.code)
    .then(response.send(request.data));
//    console.info(`google callback info ${request.query}`);
//    response.send(request.data);
})

googleService.generateUrl();

module.exports = router;