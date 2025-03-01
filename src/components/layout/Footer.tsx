const Footer = () => {
    const currentYear = new Date().getFullYear()
  
    return (
      <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                &copy; {currentYear} Weather App. All rights reserved.
              </p>
            </div>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-500">
            Powered by OpenWeather API and News API
          </div>
        </div>
      </footer>
    )
  }
  
  export default Footer
  
  