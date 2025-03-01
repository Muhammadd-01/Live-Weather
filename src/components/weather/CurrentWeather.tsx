import {
    FaTemperatureHigh,
    FaWind,
    FaCompass,
    FaTint,
    FaSun,
    FaMoon,
    FaEye,
    FaArrowUp,
    FaArrowDown,
  } from "react-icons/fa"
  import { useWeather } from "../../context/WeatherContext"
  import WeatherIcon from "./WeatherIcon"
  
  const CurrentWeather = () => {
    const { currentWeather, loading, locationLoading, error, units } = useWeather()
  
    if (loading || locationLoading) {
      return (
        <div className="weather-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 bg-opacity-80 dark:bg-opacity-80">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                {locationLoading ? "Accessing your location..." : "Loading weather data..."}
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
  
    if (!currentWeather) {
      return null
    }
  
    const tempUnit = units === "metric" ? "°C" : "°F"
    const windUnit = units === "metric" ? "m/s" : "mph"
    const visibilityValue = currentWeather.visibility
      ? units === "metric"
        ? (currentWeather.visibility / 1000).toFixed(1) + " km"
        : (currentWeather.visibility / 1609.34).toFixed(1) + " mi"
      : "N/A"
  
    // Correct timestamp formatting
    const formatTime = (timestamp: number) => {
      return new Date(timestamp * 1000).toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true, // Ensures AM/PM formatting
      })
    }
  
    return (
      <div className="weather-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 bg-opacity-80 dark:bg-opacity-80 transition-all duration-300">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="flex flex-col items-center md:items-start mb-6 md:mb-0">
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
            <div className="flex items-center mt-4">
              <WeatherIcon weatherId={currentWeather.weather[0].id} size={64} />
              <div className="ml-4">
                <p className="text-5xl font-bold">
                  {Math.round(currentWeather.main.temp)}
                  {tempUnit}
                </p>
                <p className="capitalize text-lg">{currentWeather.weather[0].description}</p>
              </div>
            </div>
  
            <div className="flex items-center mt-4 space-x-4">
              <div className="flex items-center">
                <FaArrowUp className="text-red-500 mr-1" />
                <span>
                  {Math.round(currentWeather.main.temp_max)}
                  {tempUnit}
                </span>
              </div>
              <div className="flex items-center">
                <FaArrowDown className="text-blue-500 mr-1" />
                <span>
                  {Math.round(currentWeather.main.temp_min)}
                  {tempUnit}
                </span>
              </div>
            </div>
          </div>
  
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center">
              <FaTemperatureHigh className="text-orange-500 mr-3 text-xl" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Feels Like</p>
                <p className="font-semibold text-lg">
                  {Math.round(currentWeather.main.feels_like)}
                  {tempUnit}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FaTint className="text-blue-500 mr-3 text-xl" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Humidity</p>
                <p className="font-semibold text-lg">{currentWeather.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaWind className="text-teal-500 mr-3 text-xl" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Wind</p>
                <p className="font-semibold text-lg">
                  {Math.round(currentWeather.wind.speed)} {windUnit}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FaCompass className="text-purple-500 mr-3 text-xl" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Pressure</p>
                <p className="font-semibold text-lg">{currentWeather.main.pressure} hPa</p>
              </div>
            </div>
            <div className="flex items-center">
              <FaEye className="text-gray-500 mr-3 text-xl" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Visibility</p>
                <p className="font-semibold text-lg">{visibilityValue}</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex mr-3">
                <FaSun className="text-yellow-500 text-xl" />
                <FaMoon className="text-blue-300 text-xl ml-1" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Sun</p>
                <p className="font-semibold text-lg">
                  {formatTime(currentWeather.sys.sunrise)} / {formatTime(currentWeather.sys.sunset)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  export default CurrentWeather
  