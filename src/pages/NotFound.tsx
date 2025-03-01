import { Link } from "react-router-dom"
import { FaExclamationTriangle, FaHome } from "react-icons/fa"

const NotFound = () => {
  return (
    <div className="max-w-md mx-auto text-center py-12">
      <FaExclamationTriangle className="text-yellow-500 text-6xl mx-auto mb-6" />
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="mb-8 text-gray-600 dark:text-gray-400">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors"
      >
        <FaHome className="mr-2" />
        Back to Home
      </Link>
    </div>
  )
}

export default NotFound

