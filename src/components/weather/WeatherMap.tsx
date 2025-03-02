"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { useWeather } from "../../context/WeatherContext"
import { useLanguage } from "../../context/LanguageContext"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
})

const WeatherMap: React.FC = () => {
  const { currentWeather } = useWeather()
  const { t } = useLanguage()
  const mapRef = useRef(null)

  useEffect(() => {
    if (mapRef.current && currentWeather) {
      mapRef.current.setView([currentWeather.coord.lat, currentWeather.coord.lon], 10)
    }
  }, [currentWeather])

  if (!currentWeather) {
    return null
  }

  const { lat, lon } = currentWeather.coord

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2">{t.weatherMap}</h3>
      <div className="h-96 rounded-lg overflow-hidden">
        <MapContainer center={[lat, lon]} zoom={10} style={{ height: "100%", width: "100%" }} ref={mapRef}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[lat, lon]}>
            <Popup>
              {currentWeather.name}, {currentWeather.sys.country}
              <br />
              {currentWeather.weather[0].description}
              <br />
              {Math.round(currentWeather.main.temp)}°C
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  )
}

export default WeatherMap

