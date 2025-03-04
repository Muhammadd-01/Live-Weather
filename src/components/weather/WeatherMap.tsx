"use client";

import { useEffect, useState } from "react";
import { useWeather } from "../../context/WeatherContext";
import { useLanguage } from "../../context/LanguageContext";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon issue in Vite (works only on client side)
if (typeof window !== "undefined") {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
    iconUrl: require("leaflet/dist/images/marker-icon.png"),
    shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  });
}

const MapUpdater = ({ lat, lon }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    map.setView([lat, lon], 10);
  }, [lat, lon, map]);

  return null;
};

const WeatherMap = () => {
  const { currentWeather } = useWeather();
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);

  // Ensure this runs only on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!currentWeather || !isClient) {
    return null;
  }

  const { coord } = currentWeather;
  if (!coord) return null;

  const { lat, lon } = coord;

  return (
    <div className="w-full h-[calc(100vh-200px)] mt-6">
      <MapContainer center={[lat, lon]} zoom={10} style={{ height: "100%", width: "100%", zIndex: 1 }}>
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
        <MapUpdater lat={lat} lon={lon} />
      </MapContainer>
    </div>
  );
};

export default WeatherMap;