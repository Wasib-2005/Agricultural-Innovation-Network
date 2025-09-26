import React, { useEffect, useState } from "react";
import { Droplet, Beaker, MapPin, Navigation, Wind } from "lucide-react";
import { useSelector } from "react-redux";

const SoilReport = ({ location }) => {
  const weatherData = useSelector((state) => state.weather.data);
  const weatherLoading = useSelector((state) => state.weather.loading);

  const lon = weatherData?.coord?.lon;
  const lat = weatherData?.coord?.lat;
  const proxyMoisture = weatherData?.main?.humidity;

  const [soil, setSoil] = useState({
    type: "Loading...",
    ph: "Hardware Under Development",
    moisture: proxyMoisture ? `${proxyMoisture}%` : "-",
  });

  const place = location || {
    village: weatherData?.name || "Unknown",
    district: weatherData?.sys?.country || "Unknown",
    coordinates: lat && lon ? `${lat.toFixed(3)}°N, ${lon.toFixed(3)}°E` : "-",
  };

  useEffect(() => {
    const fetchSoil = async () => {
      if (!lon || !lat) return;
      try {
        const res = await fetch(
          "https://api.openepi.io/soil/type?" + new URLSearchParams({ lon, lat })
        );
        const data = await res.json();
        const mostProbableSoilType =
          data?.properties?.most_probable_soil_type || "Unknown";
        setSoil((prev) => ({
          ...prev,
          type: mostProbableSoilType,
          moisture: proxyMoisture ? `${proxyMoisture}%` : prev.moisture,
        }));
      } catch (err) {
        console.error("Error fetching soil data:", err);
        setSoil((prev) => ({ ...prev, type: "Error fetching soil" }));
      }
    };
    fetchSoil();
  }, [lon, lat, proxyMoisture]);

  const recommendedSoil = () => {
    const moistureNum = Number(soil.moisture.toString().replace("%", "")) || 0;
    if (weatherData?.main?.temp > 30 && moistureNum < 50) {
      return `${soil.type} (Better irrigation recommended)`;
    }
    return soil.type;
  };

  return (
    <div className="w-[95%] max-w-[2000px] mx-auto mt-5 lg:mt-8 rounded-3xl p-4 lg:p-6 bg-gradient-to-r from-emerald-700/50 to-emerald-600/20">
      {/* Title */}
      <h2 className="text-lg sm:text-xl font-semibold text-slate-200 mb-4 text-center">
        Soil & Weather Report
      </h2>

      {/* Soil Recommendation */}
      <div className="text-center text-white text-lg sm:text-2xl font-bold mb-6">
        {recommendedSoil()}
      </div>

      {/* Soil & Weather Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm sm:text-base text-slate-300">
        <div className="flex items-center gap-2 bg-emerald-800/40 p-2 rounded-xl">
          <Beaker className="w-5 h-5 text-amber-300" />
          <span>pH: {soil.ph}</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-800/40 p-2 rounded-xl">
          <Droplet className="w-5 h-5 text-sky-400" />
          <span>Moisture: {soil.moisture}</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-800/40 p-2 rounded-xl">
          <Navigation className="w-5 h-5 text-blue-300" />
          <span>
            Sea Level: {weatherData?.main?.sea_level ? `${weatherData.main.sea_level} hPa` : "-"}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-800/40 p-2 rounded-xl">
          <Wind className="w-5 h-5 text-purple-300" />
          <span>Wind: {weatherData?.wind?.speed ? `${weatherData.wind.speed} m/s` : "-"}</span>
        </div>
        <div className="flex items-center gap-2 bg-emerald-800/40 p-2 rounded-xl col-span-1 sm:col-span-2 lg:col-span-4">
          <MapPin className="w-5 h-5 text-red-400" />
          <span>
            {place.village && place.district
              ? `${place.village}, ${place.district}`
              : "Location Unknown"}
          </span>
        </div>
      </div>

      {/* Weather Details */}
      {weatherData && !weatherLoading && (
        <div className="mt-6 text-slate-200 text-sm sm:text-base">
          <h3 className="font-semibold mb-2">Current Weather:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-slate-300">
            <div>Temperature: {weatherData.main?.temp}°C</div>
            <div>Description: {weatherData.weather?.[0]?.description}</div>
            <div>Humidity: {weatherData.main?.humidity}%</div>
            <div>Pressure: {weatherData.main?.pressure} hPa</div>
            <div>Wind Speed: {weatherData.wind?.speed} m/s</div>
            <div>Sea Level: {weatherData.main?.sea_level ? `${weatherData.main.sea_level} hPa` : "-"}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilReport;
