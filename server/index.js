require('dotenv').config();

const express = require("express");

const app = express();
const PORT = 8080;
const cors = require("cors");
const API_KEY = process.env.WEATHER_KEY
const WEATHER_BY_CITY_URL = `https://api.openweather.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API_KEY}`

const buildWeatherByCityURL = (lat, lon) => {
    return `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}`
}

const buildGeolocationURL = (cityName, stateCode='', countryCode='', limit=1)=> {
    if(!cityName){
        throw new Error('City must be included')
    }
    return `http://api.openweahter.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${API_KEY}`
}


app.use(cors());

app.get("/api/home", async (req, res)=> {
    //get lat and lon from city input via a request
    const city = req.query.city

    if(!city){
        throw new Error('City Must be passed in!')
    }

    //build URL and make a request get lat and lon
    const geoLocationURL = buildGeolocationURL(city)
    const geoLocationRes = await fetch(geoLocationURL)
    const geoLocationData = await geoLocationRes.json()

    //check data length is valid
    if (geoLocationData.length < 1){
        throw new Error('No locations were forund for this city')
    }

    //pull out first item in data arary since it reurns an array of objects
    const cityData = geoLocationData[0]

    const {lat, lon} = cityData

    const weatherURL = buildWeatherByCityURL(lat, lon)
    const weatherRes = await fetch(weatherURL)
    const weatherData = await weatherRes.json()

    res.json(
        weatherData
    )


});




app.listen(PORT, ()=> {
    console.log(`Server Started on port ${PORT}`);
});
