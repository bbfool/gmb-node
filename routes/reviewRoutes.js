var express = require('express');
var router = express.Router();
const weatherService = require('../weather/weatherService.js')
const googleService = require('../weather/googleServices.js');
const { response } = require('express');
const { google } = require('googleapis');

router.get('/reviews', function(req, res)
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