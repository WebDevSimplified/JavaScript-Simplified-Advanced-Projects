import axios from "axios"
import { format } from "date-fns"

navigator.geolocation.getCurrentPosition(positionSuccess, positionError)

function positionSuccess({ coords }) {
  getWeather(coords.latitude, coords.longitude)
}

function positionError() {
  alert(
    "There was an error getting your location. Please allow us to use your location and refresh the page."
  )
}

function getWeather(lat, lon) {
  axios
    .get(`http://localhost:3001/weather`, { params: { lat, lon } })
    .then(({ data }) => {
      renderWeather(data)
    })
    .catch(e => {
      console.log(e)
      alert("Error getting weather. Please try again.")
    })
}

function renderWeather({ current, daily, hourly }) {
  document.body.classList.remove("blurred")
  renderCurrentWeather(current)
  renderDailyWeather(daily)
  renderHourlyWeather(hourly)
}

const currentIcon = document.querySelector("[data-current-icon]")
function renderCurrentWeather(current) {
  setValue("current-temp", current.currentTemp)
  setValue("current-description", current.description)
  setValue("current-high", current.highTemp)
  setValue("current-low", current.lowTemp)
  setValue("current-fl-high", current.highFeelsLike)
  setValue("current-fl-low", current.lowFeelsLike)
  setValue("current-wind", current.windSpeed)
  setValue("current-precip", current.precip)
  currentIcon.src = getIconUrl(current.icon, { large: true })
}

function setValue(selector, value, { parent = document } = {}) {
  parent.querySelector(`[data-${selector}]`).textContent = value
}

const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.querySelector("[data-day-card-template]")
function renderDailyWeather(daily) {
  dailySection.innerHTML = ""
  daily.forEach(day => {
    const element = dayCardTemplate.content.cloneNode(true)
    setValue("temp", day.temp, { parent: element })
    setValue("date", formatDay(day.timestamp), { parent: element })
    element.querySelector("[data-icon]").src = getIconUrl(day.icon)
    dailySection.append(element)
  })
}

const hourlySection = document.querySelector("[data-hour-section]")
const hourRowTemplate = document.querySelector("[data-hour-row-template]")
function renderHourlyWeather(hourly) {
  hourlySection.innerHTML = ""
  hourly.forEach(hour => {
    const element = hourRowTemplate.content.cloneNode(true)
    setValue("temp", hour.temp, { parent: element })
    setValue("fl-temp", hour.feelsLike, { parent: element })
    setValue("wind", hour.windSpeed, { parent: element })
    setValue("precip", hour.precip, { parent: element })
    setValue("day", formatDay(hour.timestamp), { parent: element })
    setValue("time", formatHour(hour.timestamp), { parent: element })
    element.querySelector("[data-icon]").src = getIconUrl(hour.icon)
    hourlySection.append(element)
  })
}

function getIconUrl(icon, { large = false } = {}) {
  const size = large ? "@2x" : ""
  return `http://openweathermap.org/img/wn/${icon}${size}.png`
}

function formatDay(timestamp) {
  return format(new Date(timestamp), "eeee")
}

function formatHour(timestamp) {
  return format(new Date(timestamp), "ha")
}
