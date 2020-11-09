const { google } = require('googleapis');
const axios = require('axios')

//const fs = require('fs');

const keyFilePath = './secure/jmgcarpentry-f6abb4581557.json';

const oAuthConfigPath = '../secure/client_secret_459656627192-1a5nh0h8hjevuopkeolqnnukkt16sffr.apps.googleusercontent.com.json';

const scopes = ['https://www.googleapis.com/auth/business.manage'];
const redirect_uri = "http://localhost:3000/api/weather/google/callback"

const auth = new google.auth.GoogleAuth({
    keyFile: keyFilePath,
    scopes: scopes//'https://www.googleapis.com/auth/cloud-platform'],
});
const oAuthOptions = require(oAuthConfigPath);

const oAuthClient = new google.auth.OAuth2(oAuthOptions.web.client_id, oAuthOptions.web.client_secret, redirect_uri);

authorizedHeaders = function () {

    auth.getAccessToken()
        .then(access_token => {
            return {
                headers: {
                    'Authorization': `token ${access_token}`
                }
            };
        });
}

setClientCredentials = function (tokens) {
    oAuthClient.setCredentials(tokens);
    console.log("credentials set, this application is authorized")
}

exports.handleResponseToken = function (code) {
    console.log(`this is the code received from oAuth ${code}.\nAttempting to retrieve a pair of tokens`);
    return oAuthClient.getToken(code).then(tokenResponse => {
        tokens = tokenResponse.tokens;
        if (tokens.refresh_token) {
            // store the refresh_token in my database!
            console.log(`refresh token: ${tokens.refresh_token}`);
        }
        console.log(tokens.access_token);
        setClientCredentials(tokens);

    })


}

exports.generateUrl = function () {
    var existing_token = require('../secure/refresh_token.json')

    if (existing_token) {
        //configure the client
        setClientCredentials(existing_token);
    }
    else {
        var oAuthStuff = oAuthClient.keyFilePath = oAuthConfigPath;

        var authUrl = oAuthClient.generateAuthUrl(
            {
                // 'online' (default) or 'offline' (gets refresh_token)
                access_type: 'offline',
                client_id: oAuthOptions.web.client_id,

                // If you only need one scope you can pass it as a string
                scope: scopes,
                redirect_uri: "http://localhost:3000/api/weather/google/callback"
            });
        console.info(`visit the following url to authorize ${authUrl}`)

    }


}
authenticatedAxiosGet = function (url) {
    return oAuthClient.getAccessToken()
        .then(token => {
            return axios.get(url,
                {
                    headers: {
                        'Authorization': `Bearer ${token.token}`
                    }
                });
        });

}


exports.checkAuthToken = function () {
    var accountsUrl = "https://mybusiness.googleapis.com/v4/accounts";
    return authenticatedAxiosGet(accountsUrl)
        .then(accountResponse => {
            console.log(`account[0]: ${accountResponse.data.accounts[0].name}`);
            var accountId = '113422062961709978267'
            var locationsUrl = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations`

            return authenticatedAxiosGet(locationsUrl);
        })
        .then(locationsInfo => {
            //accounts/113422062961709978267/locations/
            var accountId = "113422062961709978267";
            var locationId = "17602224696660608880";
            var reviewsUrl = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`;
            return authenticatedAxiosGet(reviewsUrl)
//            return locationsInfo.data;
        }
        )
        .then(reviewsInfo => {
            return reviewsInfo.data;
        });

    var url = "https://mybusiness.googleapis.com/v4/accounts";

    var request = {
        "header": authHeader,
        "url": url
    }

    //var fileContents = fs.readFileSync(keyFilePath);

    return auth.getAccessToken()
        .then(token => {
            return auth.authorizeRequest(axios.get(url));
        }/* axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        }*/
        );
}