"use client"

import React, { useMemo } from "react"
import {
  FaTemperatureHigh,
  FaWind,
  FaCompass,
  FaTint,
  FaEye,
  FaSun,
  FaMoon,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa"
import { useWeather } from "../../context/WeatherContext"
import WeatherIcon from "./WeatherIcon"
import { useLanguage } from "../../context/LanguageContext"
import { translations } from "../../utils/translations"

const CurrentWeather = React.memo(() => {
  const { currentWeather, loading, locationLoading, error, units } = useWeather()
  const { language } = useLanguage()
  const t = translations[language]

  const weatherData = useMemo(() => {
    if (!currentWeather) return null

    const tempUnit = units === "metric" ? "°C" : "°F"
    const windUnit = units === "metric" ? "m/s" : "mph"
    const visibilityValue = currentWeather.visibility
      ? units === "metric"
        ? (currentWeather.visibility / 1000).toFixed(1) + " km"
        : (currentWeather.visibility / 1609.34).toFixed(1) + " mi"
      : "N/A"

    const formatTime = (timestamp: number) => {
      return new Date(timestamp * 1000).toLocaleTimeString(language, { hour: "2-digit", minute: "2-digit" })
    }

    return {
      name: currentWeather.name,
      country: currentWeather.sys.country,
      date: new Date(currentWeather.dt * 1000).toLocaleDateString(language, {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      weatherId: currentWeather.weather[0].id,
      temp: Math.round(currentWeather.main.temp),
      tempUnit,
      description: t[currentWeather.weather[0].description] || currentWeather.weather[0].description,
      tempMax: Math.round(currentWeather.main.temp_max),
      tempMin: Math.round(currentWeather.main.temp_min),
      feelsLike: Math.round(currentWeather.main.feels_like),
      humidity: currentWeather.main.humidity,
      windSpeed: Math.round(currentWeather.wind.speed),
      windUnit,
      pressure: currentWeather.main.pressure,
      visibility: visibilityValue,
      sunrise: formatTime(currentWeather.sys.sunrise),
      sunset: formatTime(currentWeather.sys.sunset),
    }
  }, [currentWeather, units, language, t])

  if (loading || locationLoading) {
    return (
      <div className="weather-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 bg-opacity-80 dark:bg-opacity-80">
        <div className="flex justify-center items-center h-64">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">
              {locationLoading ? t.accessingLocation : t.loadingWeather}
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-red-700 dark:text-red-200">
        <p>{error}</p>
      </div>
    )
  }

  if (!weatherData) {
    return null
  }

  return (
    <div className="weather-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 bg-opacity-80 dark:bg-opacity-80 transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">
            {weatherData.name}, {weatherData.country}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{weatherData.date}</p>
          <div className="flex items-center mt-4">
            <WeatherIcon weatherId={weatherData.weatherId} size={64} />
            <div className="ml-4">
              <p className="text-5xl font-bold">
                {weatherData.temp}
                {weatherData.tempUnit}
              </p>
              <p className="capitalize text-lg">{weatherData.description}</p>
            </div>
          </div>

          <div className="flex items-center mt-4 space-x-4">
            <div className="flex items-center">
              <FaArrowUp className="text-red-500 mr-1" />
              <span>
                {weatherData.tempMax}
                {weatherData.tempUnit}
              </span>
            </div>
            <div className="flex items-center">
              <FaArrowDown className="text-blue-500 mr-1" />
              <span>
                {weatherData.tempMin}
                {weatherData.tempUnit}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center">
            <FaTemperatureHigh className="text-orange-500 mr-3 text-xl" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.feelsLike}</p>
              <p className="font-semibold text-lg">
                {weatherData.feelsLike}
                {weatherData.tempUnit}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FaTint className="text-blue-500 mr-3 text-xl" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.humidity}</p>
              <p className="font-semibold text-lg">{weatherData.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaWind className="text-teal-500 mr-3 text-xl" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.wind}</p>
              <p className="font-semibold text-lg">
                {weatherData.windSpeed} {weatherData.windUnit}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FaCompass className="text-purple-500 mr-3 text-xl" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.pressure}</p>
              <p className="font-semibold text-lg">{weatherData.pressure} hPa</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaEye className="text-gray-500 mr-3 text-xl" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.visibility}</p>
              <p className="font-semibold text-lg">{weatherData.visibility}</p>
            </div>
          </div>
          <div className="flex items-center">
            <div className="flex mr-3">
              <FaSun className="text-yellow-500 text-xl" />
              <FaMoon className="text-blue-300 text-xl ml-1" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{t.sun}</p>
              <p className="font-semibold text-lg">
                {weatherData.sunrise} / {weatherData.sunset}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
})

CurrentWeather.displayName = "CurrentWeather"

export default CurrentWeather

