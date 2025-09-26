import React from "react";
import { motion } from "framer-motion";

const HarvestingTips = () => {
  const tips = [
    { area: "North Field", tip: "Harvest early morning to retain freshness." },
    { area: "South Zone", tip: "Use sharp tools to avoid crop damage." },
    { area: "East Plot", tip: "Check soil moisture before harvesting root crops." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[95%] mx-auto mt-3 p-4 bg-emerald-800/40 rounded-xl shadow-md"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white">Harvesting Tips</div>
          <div className="text-xs text-slate-300">Tips by area</div>
        </div>
      </div>

      <div className="mt-3 space-y-2">
        {tips.map((t, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="px-2 py-2 rounded-lg bg-white/10 flex items-start gap-3"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-400 mt-2" />
            <div>
              <div className="text-sm font-medium text-white">{t.area}</div>
              <div className="text-xs text-slate-300">{t.tip}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HarvestingTips;
