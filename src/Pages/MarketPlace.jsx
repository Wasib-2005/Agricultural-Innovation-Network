import { useEffect, useState } from "react";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import MarketCard from "../Components/MarketComponents/MarketCard";
import Cart from "../Components/MarketComponents/Cart";

function MarketPlace() {
  const [data, setData] = useState({});
  const [search, setSearch] = useState(""); // input field value
  const [query, setQuery] = useState(""); // actual API query

  console.log("Market Data:", data.products);

  // Fetch products
  const fetchProducts = (page = 1) => {
    const url = query
      ? `${
          import.meta.env.VITE_API_URL
        }/product_search?name=${query}&page=${page}`
      : `${import.meta.env.VITE_API_URL}/get/products?page=${page}`;

    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };

  // Initial load + search changes
  useEffect(() => {
    fetchProducts(1);
  }, [query]);

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > data.totalPages) return;
    fetchProducts(newPage);
  };

  // Debounce search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      setQuery(search.trim());
    }, 500); // wait 500ms after user stops typing
    return () => clearTimeout(timeout);
  }, [search]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // delay each card
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <div className="w-[95%] mx-auto mt-[10px] mb-[10px] bg-lime-100 rounded-2xl shadow-lg p-4">
      {/* Search bar */}
      <div className="w-full sticky top-[80px] z-[90] pt-7 md:pt-10  bg-lime-100">
        <label className="input w-full bg-white text-gray-500 rounded-2xl mb-3 flex items-center gap-2 px-3">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            className="grow outline-none"
            placeholder="Search with Name or Category"
            value={search}
            onChange={(e) => setSearch(e.target.value)} // live update
          />
          <p className="kbd kbd-sm bg-lime-300 px-6">Find: {data.total} items</p>
        </label>
      </div>

      {/* Product List */}
      <motion.div
        className="flex flex-col gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <AnimatePresence>
          {data?.products?.length > 0 ? (
            data.products.map((product) => (
              <motion.div key={product._id} variants={itemVariants} exit="exit">
                <MarketCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-center text-gray-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No products found
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-1">
        {/* First page + leading dots */}
        {data.page > 2 && (
          <>
            <div
              onClick={() => handlePageChange(1)}
              className="bg-lime-50 hover:bg-gray-500 hover:text-white px-2 border border-lime-500 text-gray-500 cursor-pointer"
            >
              1
            </div>
            {data.page > 3 && (
              <div className="px-2 border border-lime-200 text-gray-500">
                ...
              </div>
            )}
          </>
        )}

        {/* Previous page */}
        {data.page > 1 && (
          <div
            onClick={() => handlePageChange(data.page - 1)}
            className="bg-lime-50 hover:bg-gray-500 hover:text-white px-2 border border-lime-500 text-gray-500 cursor-pointer"
          >
            {data.page - 1}
          </div>
        )}

        {/* Current page */}
        <div className="bg-lime-500 text-white px-2 border border-lime-500 font-bold">
          {data.page}
        </div>

        {/* Next page */}
        {data.page < data.totalPages && (
          <div
            onClick={() => handlePageChange(data.page + 1)}
            className="bg-lime-50 hover:bg-gray-500 hover:text-white px-2 border border-lime-500 text-gray-500 cursor-pointer"
          >
            {data.page + 1}
          </div>
        )}

        {/* Trailing dots + Last page */}
        {data.page < data.totalPages - 1 && (
          <>
            {data.page < data.totalPages - 2 && (
              <div className="px-2 border border-lime-200 text-gray-500">
                ...
              </div>
            )}
            <div
              onClick={() => handlePageChange(data.totalPages)}
              className="bg-lime-50 hover:bg-gray-500 hover:text-white px-2 border border-lime-500 text-gray-500 cursor-pointer"
            >
              {data.totalPages}
            </div>
          </>
        )}
      </div>
      <Cart />

    </div>
  );
}

export default MarketPlace;
