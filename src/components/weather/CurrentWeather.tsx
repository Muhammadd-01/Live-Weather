"use client"

import React, { useMemo } from "react"
import { FaTemperatureHigh, FaWind, FaCompass, FaTint, FaEye, FaSun, FaArrowUp, FaArrowDown } from "react-icons/fa"
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

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg text-red-700 dark:text-red-200">
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="weather-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 bg-opacity-80 dark:bg-opacity-80 transition-all duration-300">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
          {loading || locationLoading ? (
            <>
              <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
              <div className="h-6 w-36 bg-gray-200 dark:bg-gray-700 rounded mb-4 animate-pulse"></div>
              <div className="flex items-center mt-4">
                <div className="h-16 w-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
                <div className="ml-4">
                  <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-6 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-bold">
                {weatherData?.name}, {weatherData?.country}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{weatherData?.date}</p>
              <div className="flex items-center mt-4">
                <WeatherIcon weatherId={weatherData?.weatherId || 800} size={64} />
                <div className="ml-4">
                  <p className="text-5xl font-bold">
                    {weatherData?.temp}
                    {weatherData?.tempUnit}
                  </p>
                  <p className="capitalize text-lg">{weatherData?.description}</p>
                </div>
              </div>
              <div className="flex items-center mt-4 space-x-4">
                <div className="flex items-center">
                  <FaArrowUp className="text-red-500 mr-1" />
                  <span>
                    {weatherData?.tempMax}
                    {weatherData?.tempUnit}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaArrowDown className="text-blue-500 mr-1" />
                  <span>
                    {weatherData?.tempMin}
                    {weatherData?.tempUnit}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          {[
            { icon: FaTemperatureHigh, label: t.feelsLike, value: `${weatherData?.feelsLike}${weatherData?.tempUnit}` },
            { icon: FaTint, label: t.humidity, value: `${weatherData?.humidity}%` },
            { icon: FaWind, label: t.wind, value: `${weatherData?.windSpeed} ${weatherData?.windUnit}` },
            { icon: FaCompass, label: t.pressure, value: `${weatherData?.pressure} hPa` },
            { icon: FaEye, label: t.visibility, value: weatherData?.visibility },
            { icon: FaSun, label: t.sun, value: `${weatherData?.sunrise} / ${weatherData?.sunset}` },
          ].map((item, index) => (
            <div key={index} className="flex items-center">
              {loading || locationLoading ? (
                <>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse mr-3"></div>
                  <div>
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                    <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  </div>
                </>
              ) : (
                <>
                  <item.icon className={`text-${index % 2 === 0 ? "blue" : "green"}-500 mr-3 text-xl`} />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.label}</p>
                    <p className="font-semibold text-lg">{item.value}</p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
})

CurrentWeather.displayName = "CurrentWeather"

export default CurrentWeather

