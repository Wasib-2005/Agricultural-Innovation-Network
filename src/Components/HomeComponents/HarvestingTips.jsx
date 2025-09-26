import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const HarvestingTips = () => {
  const [tips, setTips] = useState([]);

  useEffect(() => {
    // Fetch tips (blogs) from backend API
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/blogs?limit=3`) // Assuming you're getting the blog data from this endpoint
      .then((response) => {
        const fetchedTips = response.data.slice(0, 3); // Get the first 3 blogs as tips
        setTips(fetchedTips);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

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
              <div className="text-sm font-medium text-white">{t.title}</div>
              <div className="text-xs text-slate-300">{t.fullDesc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HarvestingTips;
