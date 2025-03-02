import type React from "react"
import { Link } from "react-router-dom"
import { FaGithub, FaTwitter, FaLinkedin, FaHeart, FaFacebook, FaInstagram } from "react-icons/fa"
import { useLanguage } from "../../context/LanguageContext"

const Footer: React.FC = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-transparent text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{t.about}</h3>
            <p className="text-sm">{t.footerAbout}</p>
          </div>
          <div className="w-full md:w-1/3 mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-200 transition-colors">
                  {t.home}
                </Link>
              </li>
              <li>
                <Link to="/forecast" className="hover:text-blue-200 transition-colors">
                  {t.forecast}
                </Link>
              </li>
              <li>
                <Link to="/news" className="hover:text-blue-200 transition-colors">
                  {t.news}
                </Link>
              </li>
              <li>
                <Link to="/emergency" className="hover:text-blue-200 transition-colors">
                  {t.emergency}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-200 transition-colors">
                  {t.about}
                </Link>
              </li>
              <li>
                <Link to="/settings" className="hover:text-blue-200 transition-colors">
                  {t.settings}
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-xl font-bold mb-2">{t.connect}</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-blue-200 transition-colors">
                <FaGithub />
              </a>
              <a href="#" className="text-2xl hover:text-blue-200 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-blue-200 transition-colors">
                <FaLinkedin />
              </a>
              <a href="#" className="text-2xl hover:text-blue-200 transition-colors">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-blue-200 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>
            &copy; {currentYear} Weather App. {t.allRightsReserved}
          </p>
          <p className="mt-2">
            Made with <FaHeart className="inline-block text-red-500" /> by Weather Enthusiasts
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

