import React from "react";
import { motion } from "framer-motion";

const CropSuggestion = () => {
  const soil = { type: "Loamy", ph: 6.8, moisture: "45%" };
  const season = "Winter";

  const cropLibrary = [
    { id: 1, name: "Rice", bestSeason: "Monsoon", expectedYield: "3.5 tons/acre", soil: "Clayey" },
    { id: 2, name: "Wheat", bestSeason: "Winter", expectedYield: "2.8 tons/acre", soil: "Loamy" },
    { id: 3, name: "Maize", bestSeason: "Summer", expectedYield: "4.0 tons/acre", soil: "Sandy" },
    { id: 4, name: "Potato", bestSeason: "Winter", expectedYield: "12 tons/acre", soil: "Loamy" },
  ];

  const suggestions = cropLibrary.filter(
    (c) => c.soil === soil.type && c.bestSeason === season
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[95%] mx-auto mt-3 p-4 bg-emerald-800/40 rounded-xl shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-slate-200">Harvesting Suggestions</div>
          <div className="text-xs text-slate-300">
            Based on soil ({soil.type}) & season ({season})
          </div>
        </div>
        <div className="text-xs text-slate-300">Quick picks</div>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-2">
        {suggestions.map((c) => (
          <motion.div
            key={c.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-between px-3 py-2 rounded-lg bg-emerald-700/40 hover:bg-emerald-700/60 transition"
          >
            <div>
              <div className="font-medium text-white">{c.name}</div>
              <div className="text-xs text-slate-300">
                Best in {c.bestSeason} • Yield: {c.expectedYield}
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1 rounded-md bg-emerald-600 text-white text-sm shadow-md hover:bg-emerald-500 transition"
            >
              Select
            </motion.button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CropSuggestion;
