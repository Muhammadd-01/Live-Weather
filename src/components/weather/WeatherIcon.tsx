import {
    FaSun,
    FaCloudSun,
    FaCloud,
    FaCloudRain,
    FaCloudShowersHeavy,
    FaBolt,
    FaSnowflake,
    FaSmog,
    FaQuestion,
  } from "react-icons/fa"
  
  interface WeatherIconProps {
    weatherId: number
    size?: number
  }
  
  const WeatherIcon = ({ weatherId, size = 24 }: WeatherIconProps) => {
    // Weather condition codes: https://openweathermap.org/weather-conditions
    let Icon
  
    // Thunderstorm
    if (weatherId >= 200 && weatherId < 300) {
      Icon = FaBolt
    }
    // Drizzle
    else if (weatherId >= 300 && weatherId < 400) {
      Icon = FaCloudRain
    }
    // Rain
    else if (weatherId >= 500 && weatherId < 600) {
      Icon = FaCloudShowersHeavy
    }
    // Snow
    else if (weatherId >= 600 && weatherId < 700) {
      Icon = FaSnowflake
    }
    // Atmosphere (fog, mist, etc.)
    else if (weatherId >= 700 && weatherId < 800) {
      Icon = FaSmog
    }
    // Clear
    else if (weatherId === 800) {
      Icon = FaSun
    }
    // Clouds
    else if (weatherId > 800 && weatherId < 900) {
      if (weatherId === 801) {
        Icon = FaCloudSun // Few clouds
      } else {
        Icon = FaCloud // More clouds
      }
    }
    // Unknown
    else {
      Icon = FaQuestion
    }
  
    return <Icon size={size} className="text-blue-500" />
  }
  
  export default WeatherIcon
  
  