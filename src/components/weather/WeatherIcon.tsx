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
    FaWind,
    FaCloudMeatball,
    FaCloudMoon,
    FaMoon,
  } from "react-icons/fa"
  
  interface WeatherIconProps {
    weatherId: number
    size?: number
    isNight?: boolean
  }
  
  const WeatherIcon = ({ weatherId, size = 24, isNight = false }: WeatherIconProps) => {
    // Weather condition codes: https://openweathermap.org/weather-conditions
    let Icon
    let color = "text-blue-500"
  
    // Thunderstorm
    if (weatherId >= 200 && weatherId < 300) {
      Icon = FaBolt
      color = "text-yellow-500"
    }
    // Drizzle
    else if (weatherId >= 300 && weatherId < 400) {
      Icon = FaCloudRain
      color = "text-blue-400"
    }
    // Rain
    else if (weatherId >= 500 && weatherId < 600) {
      if (weatherId >= 520) {
        Icon = FaCloudShowersHeavy
        color = "text-blue-600"
      } else {
        Icon = FaCloudRain
        color = "text-blue-500"
      }
    }
    // Snow
    else if (weatherId >= 600 && weatherId < 700) {
      Icon = FaSnowflake
      color = "text-blue-200"
    }
    // Atmosphere (fog, mist, etc.)
    else if (weatherId >= 700 && weatherId < 800) {
      if (weatherId === 781) {
        // Tornado
        Icon = FaWind
        color = "text-gray-700"
      } else if (weatherId === 762 || weatherId === 711) {
        // Volcanic ash or Smoke
        Icon = FaCloudMeatball
        color = "text-gray-600"
      } else {
        Icon = FaSmog
        color = "text-gray-500"
      }
    }
    // Clear
    else if (weatherId === 800) {
      if (isNight) {
        Icon = FaMoon
        color = "text-blue-300"
      } else {
        Icon = FaSun
        color = "text-yellow-500"
      }
    }
    // Clouds
    else if (weatherId > 800 && weatherId < 900) {
      if (weatherId === 801) {
        Icon = isNight ? FaCloudMoon : FaCloudSun // Few clouds
        color = isNight ? "text-blue-400" : "text-yellow-400"
      } else {
        Icon = FaCloud // More clouds
        color = "text-gray-400"
      }
    }
    // Unknown
    else {
      Icon = FaQuestion
      color = "text-gray-500"
    }
  
    return <Icon size={size} className={color} />
  }
  
  export default WeatherIcon
  
  