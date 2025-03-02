import type React from "react"
import { FaGithub, FaTwitter, FaLinkedin, FaHeart } from "react-icons/fa"
import { useLanguage } from "../../context/LanguageContext"

const Footer: React.FC = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-auto mb-4 md:mb-0">
            <p className="text-sm">
              &copy; {currentYear} Weather App. {t.allRightsReserved}
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-xl hover:text-blue-200 transition-colors">
              <FaGithub />
            </a>
            <a href="#" className="text-xl hover:text-blue-200 transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="text-xl hover:text-blue-200 transition-colors">
              <FaLinkedin />
            </a>
          </div>
        </div>
        <div className="mt-2 text-center text-sm">
          <p>
            Made with <FaHeart className="inline-block text-red-500" /> by Weather Enthusiasts
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

