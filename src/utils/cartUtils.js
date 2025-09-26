// utils/cartUtils.js
export const addToCart = (item) => {
  const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  storedItems.push(item);
  localStorage.setItem("cartItems", JSON.stringify(storedItems));

  // 🔔 Notify all components that cart was updated
  window.dispatchEvent(new Event("cartUpdated"));
};
