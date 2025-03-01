import { useWeather } from "../../context/WeatherContext"
import WeatherIcon from "./WeatherIcon"

const WeeklyForecast = () => {
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

  // Process forecast data to get daily forecasts
  const dailyData: {
    date: Date
    minTemp: number
    maxTemp: number
    weatherId: number
    description: string
  }[] = []

  const tempUnit = units === "metric" ? "°C" : "°F"

  // Group forecast by day
  const groupedByDay: Record<string, any[]> = forecast.list.reduce((acc: Record<string, any[]>, item: any) => {
    const date = new Date(item.dt * 1000).toLocaleDateString()
    if (!acc[date]) {
      acc[date] = []
    }
    acc[date].push(item)
    return acc
  }, {})

  // Get min/max temp and most frequent weather condition for each day
  Object.entries(groupedByDay).forEach(([date, items]) => {
    const temps = items.map((item: any) => item.main.temp)
    const minTemp = Math.min(...temps)
    const maxTemp = Math.max(...temps)

    // Get most frequent weather condition
    const weatherCounts: Record<number, number> = {}
    items.forEach((item: any) => {
      const id = item.weather[0].id
      weatherCounts[id] = (weatherCounts[id] || 0) + 1
    })

    const mostFrequentWeatherId = Number(
      Object.entries(weatherCounts).reduce<[string, number]>(
        (a, b) => (b[1] > a[1] ? b : a),
        ["", 0]
      )[0]
    )

    // Use noon forecast for the description if available, otherwise use the first item
    const noonForecast =
      items.find((item: any) => {
        const hour = new Date(item.dt * 1000).getHours()
        return hour >= 11 && hour <= 13
      }) || items[0]

    dailyData.push({
      date: new Date(date),
      minTemp,
      maxTemp,
      weatherId: mostFrequentWeatherId,
      description: noonForecast.weather[0].description,
    })
  })

  // Sort by date and limit to 5 days
  dailyData.sort((a, b) => a.date.getTime() - b.date.getTime())
  const weeklyData = dailyData.slice(0, 5)

  return (
    <div className="weather-card bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 mt-6 bg-opacity-80 dark:bg-opacity-80">
      <h3 className="text-xl font-semibold mb-4">5-Day Forecast</h3>
      <div className="space-y-4">
        {weeklyData.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="w-24">
              <p className="font-medium">{day.date.toLocaleDateString(undefined, { weekday: "short" })}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {day.date.toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </p>
            </div>
            <div className="flex items-center">
              <WeatherIcon weatherId={day.weatherId} size={36} />
              <p className="ml-2 text-sm capitalize hidden sm:block">{day.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              <p className="font-semibold">
                {Math.round(day.maxTemp)}
                {tempUnit}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {Math.round(day.minTemp)}
                {tempUnit}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeeklyForecast
