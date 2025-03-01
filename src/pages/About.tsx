import { FaCloudSun, FaCode, FaServer, FaShieldAlt } from "react-icons/fa"

const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">About Weather App</h1>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex items-center mb-4">
          <FaCloudSun className="text-blue-500 mr-3" size={24} />
          <h2 className="text-2xl font-semibold">Our Mission</h2>
        </div>
        <p className="mb-4">
          Weather App provides real-time weather information to help you plan your day and stay safe during extreme
          weather events. Our goal is to deliver accurate, timely, and easy-to-understand weather data in an engaging
          and interactive format.
        </p>
        <p>
          We believe that access to reliable weather information is essential for daily planning and safety. That's why
          we've created a comprehensive platform that not only shows you current conditions but also provides forecasts,
          emergency alerts, and weather-related news.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaServer className="text-green-500 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Data Sources</h2>
          </div>
          <p>
            We use the OpenWeather API to provide accurate and up-to-date weather information. News content is sourced
            from the News API, focusing on weather and climate-related stories.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaCode className="text-purple-500 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Technology</h2>
          </div>
          <p>
            Weather App is built using React and Vite for a fast, responsive experience. We use TailwindCSS for styling
            and implement modern web practices for optimal performance.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center mb-4">
            <FaShieldAlt className="text-red-500 mr-3" size={24} />
            <h2 className="text-xl font-semibold">Privacy</h2>
          </div>
          <p>
            We only collect location data with your permission to provide accurate local weather information. Your data
            is never sold to third parties and is only used to enhance your weather experience.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
        <ol className="list-decimal list-inside space-y-3 ml-2">
          <li>
            <strong>Location Detection:</strong> With your permission, we detect your location to provide accurate local
            weather information.
          </li>
          <li>
            <strong>Data Retrieval:</strong> We fetch real-time weather data from OpenWeather API for your location.
          </li>
          <li>
            <strong>Forecast Generation:</strong> We process the data to create hourly and 5-day forecasts.
          </li>
          <li>
            <strong>Emergency Detection:</strong> We analyze weather conditions to identify potential hazards and
            provide safety alerts.
          </li>
          <li>
            <strong>News Integration:</strong> We gather the latest weather-related news to keep you informed about
            climate events.
          </li>
        </ol>
      </div>
    </div>
  )
}

export default About

