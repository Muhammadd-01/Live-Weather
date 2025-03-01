import HourlyForecast from "../components/weather/HourlyForecast"
import WeeklyForecast from "../components/weather/WeeklyForecast"
import EmergencyAlert from "../components/emergency/EmergencyAlert"

const Forecast = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <EmergencyAlert />

      <h1 className="text-3xl font-bold mb-6">Weather Forecast</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Hourly Forecast</h2>
        <HourlyForecast />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">5-Day Forecast</h2>
        <WeeklyForecast />
      </div>
    </div>
  )
}

export default Forecast

