import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  // Load items from localStorage
  const loadCartItems = () => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    setItems(storedItems);
  };

  useEffect(() => {
    loadCartItems();

    // Listen for updates
    window.addEventListener("cartUpdated", loadCartItems);

    return () => {
      window.removeEventListener("cartUpdated", loadCartItems);
    };
  }, []);

  // Remove item
  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedItems));

    if (updatedItems.length === 0) setOpen(false);
  };

  // Total price
  const totalPrice = items.reduce((acc, item) => acc + item.price, 0);

  if (items.length === 0) return null;

  return (
    <>
      {/* Floating Cart Button */}
      <div
        onClick={() => setOpen(!open)}
        className="w-[80px] h-[80px] rounded-full bg-gradient-to-r 
                   from-emerald-700/80 to-emerald-600/60 
                   flex justify-center items-center fixed bottom-10 right-10 
                   cursor-pointer hover:scale-110 transition-transform duration-300 
                   shadow-lg shadow-emerald-400/40"
      >
        {/* Item Count */}
        <div
          className="absolute top-2 right-2 bg-red-500 text-white 
                        text-xs font-bold w-5 h-5 rounded-full flex 
                        justify-center items-center"
        >
          {items.length}
        </div>

        {/* Cart Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.8"
          stroke="white"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 
               1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 
               0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 
               0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 
               0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 
               0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>

      {/* Cart Panel */}
      {open && (
        <div className="fixed bottom-28 right-10 w-72 bg-white rounded-xl shadow-xl p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            Your Cart
          </h2>

          <ul className="space-y-2 max-h-40 overflow-y-auto">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-1"
              >
                <div>
                  <span className="text-gray-700">{item.name}</span>
                  <span className="ml-2 text-gray-600">৳{item.price}</span>
                </div>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="Remove item"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>

          {/* Total */}
          <div className="flex justify-between items-center mt-4 font-semibold text-gray-800">
            <span>Total:</span>
            <span>৳{totalPrice}</span>
          </div>

          {/* Checkout */}
          <button
          onClick={()=>navigate("/checkout")}
            className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 
                             text-white py-2 rounded-lg font-semibold 
                             transition duration-300"
          >
            Checkout
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
