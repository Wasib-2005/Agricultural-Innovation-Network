import React, { useEffect, useState } from "react";
import { Sun, Droplet, Thermometer } from "lucide-react"; // use lucide-react icons

const Localweather = () => {
  const [weather, setWeather] = useState(null);

  // Mock weather data (replace with API later if needed)
  useEffect(() => {
    setTimeout(() => {
      setWeather({
        temp: 29,
        condition: "Sunny",
        humidity: 65,
      });
    }, 1000);
  }, []);

  return (
    <div className="w-[95%] mx-auto mt-3 p-4 bg-emerald-800/40 rounded-xl shadow-md">
      <div className="flex items-center justify-between">
        {/* Left: Weather Icon + Info */}
        <div className="flex items-center gap-3">
          <Sun className="w-8 h-8 text-yellow-400" />
          <div>
            <div className="text-sm text-slate-200">Local Weather</div>
            <div className="text-lg font-semibold text-white">
              {weather
                ? `${weather.temp}°C — ${weather.condition}`
                : "Loading..."}
            </div>
          </div>
        </div>

        {/* Right: Humidity + Feels Like */}
        <div className="text-sm text-slate-300 flex flex-col items-end">
          <div className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-sky-400" />
            {weather ? `${weather.humidity}%` : "--"}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <Thermometer className="w-4 h-4 text-red-400" />
            Feels like {weather ? `${weather.temp - 1}°C` : "--"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Localweather;
