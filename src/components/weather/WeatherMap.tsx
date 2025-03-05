"use client";

import { useEffect, useState } from "react";
import { useWeather } from "../../context/WeatherContext";
import { useLanguage } from "../../context/LanguageContext";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix Leaflet icon issue in Next.js
const fixLeafletIcons = () => {
  if (typeof window !== "undefined") {
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "/leaflet/dist/images/marker-icon-2x.png",
      iconUrl: "/leaflet/dist/images/marker-icon.png",
      shadowUrl: "/leaflet/dist/images/marker-shadow.png",
    });
  }
};

// Dynamic center updater
const MapUpdater = ({ lat, lon }: { lat: number; lon: number }) => {
  const map = useMap();

  useEffect(() => {
    if (map) {
      map.flyTo([lat, lon], 10, { animate: true });
    }
  }, [lat, lon, map]);

  return null;
};

const WeatherMap = () => {
  const { currentWeather } = useWeather();
  const { t } = useLanguage();
  const [isClient, setIsClient] = useState(false);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);

  useEffect(() => {
    setIsClient(true);
    fixLeafletIcons();
  }, []);

  useEffect(() => {
    if (currentWeather?.coord) {
      setMapCenter([currentWeather.coord.lat, currentWeather.coord.lon]);
    }
  }, [currentWeather]);

  if (!currentWeather || !isClient || !mapCenter) return null;

  const { lat, lon } = currentWeather.coord;

  return (
    <div className="w-full h-[calc(100vh-200px)] mt-6">
      <MapContainer
        key={lat + lon} // Forces re-render when location changes
        center={mapCenter}
        zoom={10}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
        />
        <Marker position={mapCenter}>
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
