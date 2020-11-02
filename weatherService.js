import axios from 'axios'

function getLatLongByZip(zipCode) {
    const zipLookupUrl = 'https://public.opendatasoft.com/api/records/1.0/search'
    var requestParams = { "q" : zipCode,    
                    "dataset" : "us-zip-code-latitude-and-longitude" }
    return axios.get(zipLookupUrl, { "params": requestParams });
}

function mapCoordinates(coordinateData)
{
    var latitude = coordinateData[0].toFixed(3);
    var longitude = coordinateData[1].toFixed(3);
    //fields = coordinateData.records[0].fields; //https://api.weather.gov/points/43.594,-116.199
    var coordinateMapUrl = `https://api.weather.gov/points/${latitude},${longitude}`;
    return axios.get(coordinateMapUrl);

}

function getWeatherByZone(zoneData) {
    try {
        //extract office, and zone coordinates
        var gridId = zoneData.gridId
        var gridX = zoneData.gridX
        var gridY = zoneData.gridY
        var weatherUrl = `https://api.weather.gov/gridpoints/${gridId}/${gridX},${gridY}/forecast`;
        console.log(`found weather for gridId: ${gridId}`)
      return axios.get(weatherUrl)
    } catch (error) {
      console.error(error);
    }
  }

  export function getWeatherForecastByZip(zipCode)
  {
    return getLatLongByZip(zipCode)
    .then(coordinates => {
        var geoPoint = coordinates.data.records[0].fields.geopoint;
        return mapCoordinates(geoPoint);
    })
    .then(weatherZone => getWeatherByZone(weatherZone.data.properties))
    .catch(badResult => {
        console.error(badResult);
        throw new Error(`error with weather retrieval ${badResult}`);
    }
        );
    /*.then(forecast => {
        return forecast;
    }*/
            //);
  }