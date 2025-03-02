"use client";

import { useEffect, useRef } from "react";
import { useWeather } from "../../context/WeatherContext";
import { useLanguage } from "../../context/LanguageContext";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet marker icon issue
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const WeatherMap: React.FC = () => {
  const { currentWeather } = useWeather();
  const { t } = useLanguage();
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && currentWeather) {
      mapRef.current.setView([currentWeather.coord.lat, currentWeather.coord.lon], 10);
    }
  }, [currentWeather]);

  if (!currentWeather) {
    return null;
  }

  const { lat, lon } = currentWeather.coord;

  return (
    <div className="w-full h-[calc(100vh-64px)] mt-6">
      {typeof window !== "undefined" && ( // Prevents SSR issues
        <MapContainer
          center={[lat, lon]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(map) => (mapRef.current = map)}
        >
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
      )}
    </div>
  );
};

export default WeatherMap;
