import axios from "axios"

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

const weatherApi = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
})

export const getCurrentWeather = async (lat: number, lon: number, units = "metric") => {
  const response = await weatherApi.get("/weather", {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units,
    },
  })
  return response.data
}

export const getForecast = async (lat: number, lon: number, units = "metric") => {
  const response = await weatherApi.get("/forecast", {
    params: {
      lat,
      lon,
      appid: API_KEY,
      units,
    },
  })
  return response.data
}

export const getWeatherByCity = async (city: string, units = "metric") => {
  const response = await weatherApi.get("/weather", {
    params: {
      q: city,
      appid: API_KEY,
      units,
    },
  })
  return response.data
}

export const getCityAutocomplete = async (query: string) => {
  const response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`)
  return response.data
}

