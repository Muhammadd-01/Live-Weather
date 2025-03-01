import { FaTemperatureHigh, FaWind, FaCompass, FaTint } from "react-icons/fa"
import { useWeather } from "../../context/WeatherContext"
import WeatherIcon from "./WeatherIcon"

const CurrentWeather = () => {
  const { currentWeather, loading, error, units } = useWeather()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
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

  if (!currentWeather) {
    return null
  }

  const tempUnit = units === "metric" ? "°C" : "°F"
  const windUnit = units === "metric" ? "m/s" : "mph"

  return (
    <div className="weather-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 bg-opacity-80 dark:bg-opacity-80">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
          <h2 className="text-2xl font-bold">
            {currentWeather.name}, {currentWeather.sys.country}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {new Date(currentWeather.dt * 1000).toLocaleDateString(undefined, {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <div className="flex items-center mt-2">
            <WeatherIcon weatherId={currentWeather.weather[0].id} size={48} />
            <div className="ml-2">
              <p className="text-4xl font-bold">
                {Math.round(currentWeather.main.temp)}
                {tempUnit}
              </p>
              <p className="capitalize">{currentWeather.weather[0].description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <FaTemperatureHigh className="text-orange-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Feels Like</p>
              <p className="font-semibold">
                {Math.round(currentWeather.main.feels_like)}
                {tempUnit}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FaTint className="text-blue-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
              <p className="font-semibold">{currentWeather.main.humidity}%</p>
            </div>
          </div>
          <div className="flex items-center">
            <FaWind className="text-teal-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Wind</p>
              <p className="font-semibold">
                {Math.round(currentWeather.wind.speed)} {windUnit}
              </p>
            </div>
          </div>
          <div className="flex items-center">
            <FaCompass className="text-purple-500 mr-2" />
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pressure</p>
              <p className="font-semibold">{currentWeather.main.pressure} hPa</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CurrentWeather

