import React from "react";
import { motion } from "framer-motion";
import { Leaf, Facebook, Twitter, Instagram } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const footerAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const links = [
  { path: "/", label: "Home" },
  { path: "/product-list", label: "Marketplace" },
  { path: "/blogs", label: "Blogs" },
  { path: "/calculator", label: "Farm Calculator" },
  { path: "/add", label: "Add Goods" },
];

const Footer = () => {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={footerAnimation}
      className="w-[95%] max-w-[2000px] mx-auto mt-10 rounded-2xl bg-emerald-900/90 text-slate-200 p-6"
    >
      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Logo + About */}
        <div className="flex flex-col items-start">
          <div className="flex items-center gap-2">
            <img src="../public/ain-logo-01.png" alt="" className="w-[70px]" />
            <span className="text-lg font-semibold">Harvesting Friend</span>
          </div>
          <p className="text-sm text-slate-300 mt-2">
            A smart farming assistant providing weather, soil, crop suggestions
            & marketplace solutions for farmers.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm text-slate-300">
            {links.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className="hover:text-white transition-colors"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact / Social */}
        <div>
          <h3 className="text-sm font-semibold mb-2">Stay Connected</h3>
          <p className="text-sm text-slate-300">
            Munshiganj Polytechnic Institute <br />
            Email: support@agriconnect.com
          </p>
          <div className="flex gap-3 mt-3">
            <a href="#" className="hover:text-emerald-400">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-emerald-400">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="hover:text-emerald-400">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-700 mt-6 pt-3 text-center text-[15px] text-slate-400">
        <p>© 2025 Harvesting Friend. All rights reserved.</p>
        <Link
        to={"/our_team"} className="text-[14px] text-white">
          Develop By <span className="hover:text-blue-500">ZoroOneCorporation</span>
        </Link>
      </div>
    </motion.footer>
  );
};

export default Footer;
