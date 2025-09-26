import React, { useContext } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";
import { addToCart } from "../../utils/cartUtils";

const MarketCard = ({ product }) => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <motion.div
      className="w-[92%] md:w-[95%] bg-lime-100 rounded-2xl shadow-lg 
                 border border-lime-300 overflow-hidden hover:shadow-xl 
                 transition duration-300 mt-[20px] mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 8px 20px rgba(132, 204, 22, 0.5)",
      }}
    >
      <div className="flex flex-col md:flex-row text-black p-2">
        {/* Image */}
        <motion.div
          className="h-[200px] md:h-[300px] rounded-2xl m-[5px] md:w-[40%] 
                     bg-lime-200 flex justify-center items-center overflow-hidden"
        >
          <img
            src={product?.productImg || ""}
            alt={product?.productName || "Product"}
            className="w-[100%] object-contain"
          />
        </motion.div>

        {/* Details */}
        <div className="p-4 md:p-12 pb0 flex-1 flex flex-col justify-between">
          <div className="grid gap-2">
            <h2 className="text-lg md:text-xl font-bold text-lime-800">
              {product?.productName || "Product Name"}
            </h2>
            <hr className="border-dashed" />
            <p className="text-sm md:text-base text-lime-700 mt-1">
              {product?.productDescription?.slice(0, 250) ||
                "A short description of the product goes here."}
              {product?.productDescription?.length > 250 && (
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {" "}
                  Read more...
                </span>
              )}
            </p>
          </div>
          <hr className="border-dashed" />

          <p
            className={
              product?.productQuantity <= 1
                ? "text-red-600 font-medium"
                : "text-blue-600 font-medium"
            }
          >
            {product?.productQuantity <= 1 ? "Stock Out" : "In Stock"} (
            {product?.productQuantity.toFixed()})
          </p>

          {/* Price + Buttons */}
          <div className="grid md:flex gap-2 justify-between items-center mt-4">
            <p className="flex gap-2">
              <span className="text-xl font-semibold text-lime-900">
                ৳ {product?.productPrice || "Stock Out"}
              </span>
              <span className="text-xl font-semibold text-lime-900">
                per KG
              </span>
            </p>
            <div className="flex gap-2">
              <motion.button
                onClick={() => navigate(`/product/${product._id}`)}
                className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium 
                           transition transform hover:bg-blue-300 hover:scale-105"
              >
                View Info
              </motion.button>
              <motion.button
                onClick={() =>
                  addToCart({
                    id: product?._id,
                    name: product?.productName,
                    price: product?.productPrice,
                  })
                }
                className="px-4 py-2 rounded-lg bg-lime-500 text-white font-medium 
                           transition transform hover:bg-lime-600 hover:scale-105"
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketCard;
