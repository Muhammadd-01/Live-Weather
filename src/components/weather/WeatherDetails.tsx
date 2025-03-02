import type React from "react"
import { useWeather } from "../../context/WeatherContext"
import { useLanguage } from "../../context/LanguageContext"
import { FaThermometerHalf, FaTint, FaWind, FaCompass, FaSun, FaMoon, FaCloudRain, FaEye } from "react-icons/fa"

const WeatherDetails: React.FC = () => {
  const { currentWeather, units } = useWeather()
  const { t } = useLanguage()

  if (!currentWeather) return null

  const { main, wind, sys, rain, visibility } = currentWeather

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const getWindDirection = (degrees: number) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ]
    return directions[Math.round(degrees / 22.5) % 16]
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">{t.weatherDetails}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center">
          <FaThermometerHalf className="text-red-500 mr-2 text-xl" />
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">{t.feelsLike}</p>
            <p className="text-lg text-gray-800 dark:text-white">
              {Math.round(main.feels_like)}°{units === "metric" ? "C" : "F"}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <FaTint className="text-blue-500 mr-2 text-xl" />
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">{t.humidity}</p>
            <p className="text-lg text-gray-800 dark:text-white">{main.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaWind className="text-gray-500 mr-2 text-xl" />
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">{t.windSpeed}</p>
            <p className="text-lg text-gray-800 dark:text-white">
              {wind.speed} {units === "metric" ? "m/s" : "mph"}
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCompass className="text-green-500 mr-2 text-xl" />
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">{t.windDirection}</p>
            <p className="text-lg text-gray-800 dark:text-white">
              {getWindDirection(wind.deg)} ({wind.deg}°)
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <FaSun className="text-yellow-500 mr-2 text-xl" />
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">{t.sunrise}</p>
            <p className="text-lg text-gray-800 dark:text-white">{formatTime(sys.sunrise)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaMoon className="text-blue-300 mr-2 text-xl" />
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">{t.sunset}</p>
            <p className="text-lg text-gray-800 dark:text-white">{formatTime(sys.sunset)}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaCloudRain className="text-blue-400 mr-2 text-xl" />
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">{t.precipitation}</p>
            <p className="text-lg text-gray-800 dark:text-white">{rain ? `${rain["1h"]} mm` : "0 mm"}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaEye className="text-purple-500 mr-2 text-xl" />
          <div>
            <p className="font-medium text-gray-600 dark:text-gray-300">{t.visibility}</p>
            <p className="text-lg text-gray-800 dark:text-white">{visibility / 1000} km</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDetails

