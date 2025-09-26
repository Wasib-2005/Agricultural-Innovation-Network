import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../Contexts/UserContext";

const Checkout = () => {
  const { userData } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    if (storedItems.length === 0) {
      setCartItems([]);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      try {
        const requests = storedItems.map((item) =>
          axios.get(`${import.meta.env.VITE_API_URL}/get/product/${item.id}`)
        );
        const responses = await Promise.all(requests);

        const products = responses.map((res, i) => ({
          ...res.data,
          quantity: storedItems[i].quantity || 1,
        }));

        setCartItems(products);
      } catch (error) {
        toast.error("Error fetching product details!", {
          position: "top-right",
          autoClose: 5000,
          theme: "light",
          transition: Bounce,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const updateQuantity = (index, change) => {
    const updated = [...cartItems];
    const product = updated[index];
    let newQuantity = parseFloat(product.quantity) + change;

    if (newQuantity < 0) {
      toast.error("Quantity cannot be less than 0!", {
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (newQuantity > product.productQuantity) {
      toast.error(`Max stock available: ${product.productQuantity} kg`, {
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    product.quantity = newQuantity;
    if (product.quantity === 0) updated.splice(index, 1);

    setCartItems(updated);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        updated.map((item) => ({ id: item._id, quantity: item.quantity }))
      )
    );
  };

  const handleInputChange = (index, value) => {
    const updated = [...cartItems];
    const product = updated[index];
    let newQuantity = parseFloat(value);

    if (isNaN(newQuantity) || newQuantity < 0) {
      toast.error("Invalid quantity!", { theme: "light", transition: Bounce });
      return;
    }
    if (newQuantity > product.productQuantity) {
      toast.error(`Max stock available: ${product.productQuantity} kg`, {
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    product.quantity = newQuantity;
    if (product.quantity === 0) updated.splice(index, 1);

    setCartItems(updated);
    localStorage.setItem(
      "cartItems",
      JSON.stringify(
        updated.map((item) => ({ id: item._id, quantity: item.quantity }))
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.productPrice * (item.quantity || 0),
    0
  );

  const handleCheckout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/checkout`, {
        cartItems,
        userEmail: userData?.email,
      });

      toast.success("Order placed successfully!", {
        theme: "light",
        transition: Bounce,
      });
      localStorage.removeItem("cartItems");
      setCartItems([]);
    } catch (error) {
      toast.error("❌ Error placing order.", {
        theme: "light",
        transition: Bounce,
      });
    }
  };

  if (loading)
    return <div className="text-center mt-20">Loading your cart...</div>;
  if (cartItems.length === 0)
    return <div className="text-center mt-10">Your cart is empty 🛒</div>;

  return (
    <div className="w-full max-w-6xl mx-auto px-4 mt-8">
      <ToastContainer />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {cartItems.map((item, index) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl shadow-md"
            >
              <img
                src={item.productImg}
                alt={item.productName}
                className="w-24 h-24 object-cover rounded-xl"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-800">
                  {item.productName}
                </h3>
                <p className="text-sm text-gray-600">
                  ৳{item.productPrice} per kg
                </p>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(index, -1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    ➖
                  </button>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    className="border rounded px-2 py-1 w-20 text-center text-gray-700"
                  />
                  <button
                    onClick={() => updateQuantity(index, 1)}
                    className="px-2 py-1 bg-gray-200 rounded"
                  >
                    ➕
                  </button>
                  <span className="text-sm">kg</span>
                </div>

                <p className="text-sm text-gray-500 mt-1">
                  Stock available: {item.productQuantity} kg
                </p>
              </div>

              <div className="font-bold text-lg text-gray-800 mt-2 sm:mt-0">
                ৳{(item.productPrice * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 bg-white p-6 rounded-2xl shadow-md border">
          <h2 className="text-xl font-bold text-lime-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-gray-800"
              >
                <span>
                  {item.productName} × {item.quantity} kg
                </span>
                <span>৳{(item.productPrice * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg text-gray-800">
            <span>Total</span>
            <span>৳{totalPrice.toFixed(2)}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-lime-600 hover:bg-lime-700 text-white py-3 rounded-xl font-semibold"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
