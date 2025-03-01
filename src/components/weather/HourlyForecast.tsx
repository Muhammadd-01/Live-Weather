import { useWeather } from "../../context/WeatherContext"
import WeatherIcon from "./WeatherIcon"

const HourlyForecast = () => {
  const { forecast, loading, error, units } = useWeather()

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error || !forecast) {
    return null
  }

  // Get the next 24 hours (8 items with 3-hour steps)
  const hourlyData = forecast.list.slice(0, 8)
  const tempUnit = units === "metric" ? "°C" : "°F"

  return (
    <div className="weather-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mt-6 overflow-x-auto bg-opacity-80 dark:bg-opacity-80">
      <h3 className="text-xl font-semibold mb-4">Hourly Forecast</h3>
      <div className="flex space-x-6 pb-2">
        {hourlyData.map((item: any, index: number) => (
          <div key={index} className="flex flex-col items-center min-w-[80px]">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {new Date(item.dt * 1000).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            <WeatherIcon weatherId={item.weather[0].id} size={36} />
            <p className="font-semibold mt-1">
              {Math.round(item.main.temp)}
              {tempUnit}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{item.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HourlyForecast

