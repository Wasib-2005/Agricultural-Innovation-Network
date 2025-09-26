import React from "react";
import { motion } from "framer-motion";
import CropSuggestion from "../Components/HomeComponents/CropSuggestion";
import HarvestingTips from "../Components/HomeComponents/HarvestingTips";
import Hero from "../Components/HomeComponents/Hero";
import SoilReport from "../Components/HomeComponents/Soilreport";

// Animation variants
const scrollAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Home = () => {
  return (
    <div className="space-y-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollAnimation}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollAnimation}
      >
        <SoilReport />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollAnimation}
      >
        <CropSuggestion />
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={scrollAnimation}
      >
        <HarvestingTips />
      </motion.div>
    </div>
  );
};

export default Home;
