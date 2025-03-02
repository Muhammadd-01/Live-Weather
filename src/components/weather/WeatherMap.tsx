"use client";

import { useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";
import { useLanguage } from "../../context/LanguageContext";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix: Use import instead of require() for Next.js
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Fix: Set the correct default Leaflet icon
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// ✅ Component to update map position when weather changes
const MapUpdater = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 10);
  }, [lat, lon, map]);
  return null;
};

const WeatherMap: React.FC = () => {
  const { currentWeather } = useWeather();
  const { t } = useLanguage();

  if (!currentWeather) {
    return null;
  }

  const { lat, lon } = currentWeather.coord;

  return (
    <div className="w-full h-[calc(100vh-64px)] mt-6">
      {/* Fix: MapContainer cannot use ref, so removed `ref={mapRef}` */}
      <MapContainer center={[lat, lon]} zoom={10} style={{ height: "100%", width: "100%" }}>
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
