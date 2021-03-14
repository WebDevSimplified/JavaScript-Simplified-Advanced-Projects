require("dotenv").config()
const express = require("express")
const axios = require("axios")
const cors = require("cors")

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/weather", (req, res) => {
  const { lat, lon } = req.query
  axios
    .get("https://api.openweathermap.org/data/2.5/onecall", {
      params: {
        units: "imperial",
        lat,
        lon,
        appid: process.env.API_KEY,
        exclude: "minutely,alerts",
      },
    })
    .then(({ data }) => {
      res.json({
        current: parseCurrentWeather(data),
        daily: parseDailyWeather(data),
        hourly: parseHourlyWeather(data),
      })
    })
    .catch(e => {
      console.log(e)
      res.sendStatus(500)
    })
})

function parseCurrentWeather({ current, daily }) {
  const { temp: currentTemp, wind_speed, weather, dt } = current
  const { pop, feels_like, temp } = daily[0]

  return {
    currentTemp: Math.round(currentTemp),
    highTemp: Math.round(temp.max),
    lowTemp: Math.round(temp.min),
    precip: Math.round(pop * 100),
    highFeelsLike: Math.round(Math.max(...Object.values(feels_like))),
    lowFeelsLike: Math.round(Math.min(...Object.values(feels_like))),
    timestamp: dt * 1000,
    windSpeed: Math.round(wind_speed),
    icon: weather[0].icon,
    description: weather[0].description,
  }
}

function parseDailyWeather({ daily }) {
  return daily.slice(1).map(day => {
    return {
      timestamp: day.dt * 1000,
      icon: day.weather[0].icon,
      temp: Math.round(day.temp.day),
    }
  })
}

const HOUR_IN_SECONDS = 3600
function parseHourlyWeather({ hourly, current }) {
  return hourly
    .filter(hour => hour.dt > current.dt - HOUR_IN_SECONDS)
    .map(hour => {
      return {
        temp: Math.round(hour.temp),
        precip: Math.round(hour.pop * 100),
        timestamp: hour.dt * 1000,
        windSpeed: Math.round(hour.wind_speed),
        feelsLike: Math.round(hour.feels_like),
        icon: hour.weather[0].icon,
      }
    })
}

app.listen(3001)
