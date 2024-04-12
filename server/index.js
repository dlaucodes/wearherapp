const express = require("express");

const app = express();
const PORT = 8080;
const cors = require("cors");
const API_KEY = "d2c5063765dcb7d0bdd46e8c3ce52011"
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
    const city = req.query.city

    if(!city){
        throw new Error('City Must be passed in!')
    }


});




app.listen(PORT, ()=> {
    console.log(`Server Started on port ${PORT}`);
});

console.log(API_KEY)