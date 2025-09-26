import React from "react";
import { Link } from "react-router";

function MarketMain() {
  // Sample farming item data
  const products = [
    {
      id: 1,
      name: "Tractor",
      desc: "High performance tractor for all terrains.",
      price: 250000,
      rating: 5,
      img: "",
    },
    {
      id: 2,
      name: "Irrigation Pump",
      desc: "Durable pump for efficient water management.",
      price: 15000,
      rating: 4,
      img: "https://via.placeholder.com/100",
    },
    {
      id: 3,
      name: "Seed Bag",
      desc: "High quality seeds for better yield.",
      price: 1200,
      rating: 4,
      img: "https://via.placeholder.com/100",
    },
    {
      id: 4,
      name: "Fertilizer Pack",
      desc: "Nutrient-rich fertilizer for healthy crops.",
      price: 800,
      rating: 5,
      img: "https://via.placeholder.com/100",
    },
    {
      id: 5,
      name: "Hand Hoe",
      desc: "Ergonomic hand hoe for easy soil cultivation.",
      price: 500,
      rating: 4,
      img: "https://via.placeholder.com/100",
    },
  ];

  // Function to render stars
  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={i < count ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ));
  };

  return (
    <div className="w-[95%] mx-auto mt-[10px] mb-[10px] bg-lime-100 rounded-2xl shadow-lg p-4">
      {/* Vertical Farming Product List */}
      <div className="flex flex-col gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col md:flex-row items-center bg-lime-50 rounded-xl shadow-md border border-lime-300 hover:shadow-lg transition duration-300 p-3"
          >
            {/* Product Image */}
            <div className="w-[280px] md:w-[120px] h-[200px] md:h-[120px] bg-lime-200 flex justify-center items-center rounded-lg overflow-hidden mb-[10px]">
              <img
                src={product.img}
                alt={product.name}
                className= "w-[100%] md:w-[100%] object-contain"
              />
            </div>


            {/* Product Details */}
            <div className="flex-1 ml-4 w-full">
              <h2 className="text-lg font-bold text-lime-800">{product.name}</h2>
              <p className="text-sm text-lime-700">{product.desc}</p>

              {/* Rating */}
              <div className="flex items-center mt-1">{renderStars(product.rating)}</div>

              <div className="flex justify-between items-center mt-2">
                {/* Price in Taka */}
                <span className="text-xl font-semibold text-lime-900">
                  ৳ {product.price}
                </span>

                {/* Add Button */
              } <Link to="/product">
                <button className="px-3 py-2 rounded-lg bg-lime-500 text-white font-medium transition transform hover:bg-lime-600 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/50">
                  Add
                </button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MarketMain;
