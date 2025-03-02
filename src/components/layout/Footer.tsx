import type React from "react"
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaHeart } from "react-icons/fa"
import { useLanguage } from "../../context/LanguageContext"

const Footer: React.FC = () => {
  const { t } = useLanguage()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{t.about}</h3>
            <p className="text-sm">{t.footerAbout}</p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-blue-200 transition-colors">
                  {t.home}
                </a>
              </li>
              <li>
                <a href="/forecast" className="hover:text-blue-200 transition-colors">
                  {t.forecast}
                </a>
              </li>
              <li>
                <a href="/news" className="hover:text-blue-200 transition-colors">
                  {t.news}
                </a>
              </li>
              <li>
                <a href="/emergency" className="hover:text-blue-200 transition-colors">
                  {t.emergency}
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-blue-200 transition-colors">
                  {t.about}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t.connect}</h3>
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
                <FaEnvelope />
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

