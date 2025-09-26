import React, { useState } from "react";

function Dashboard() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Tomato",
      quantity: 100,
      unitPrice: 50,
      totalPrice: 5000,
      status: "Approved",
      buyer: "N/A",
    },
    {
      id: 2,
      name: "Potato",
      quantity: 200,
      unitPrice: 40,
      totalPrice: 8000,
      status: "Pending",
      buyer: "N/A",
    },
  ]);

  const [requests, setRequests] = useState([
    { id: 1, product: "Chili", quantity: 20, unitPrice: 60, buyer: "Rahim" },
    { id: 2, product: "Tomato", quantity: 50, unitPrice: 55, buyer: "Safa" },
  ]);

  const handleApprove = (requestId) => {
    const request = requests.find((req) => req.id === requestId);
    if (!request) return;

    const newProduct = {
      id: products.length + 1,
      name: request.product,
      quantity: request.quantity,
      unitPrice: request.unitPrice,
      totalPrice: request.quantity * request.unitPrice,
      status: "Approved",
      buyer: request.buyer,
    };

    setProducts([...products, newProduct]);
    setRequests(requests.filter((req) => req.id !== requestId));
  };

  const totalSales = products
    .filter((p) => p.status === "Approved")
    .reduce((acc, product) => acc + product.totalPrice, 0);

  return (
    <div className="w-[95%] mx-auto mt-6 p-6 bg-lime-200 rounded-2xl text-[12px] md:text-xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-lime-800 mb-6 text-center">
        👨‍🌾 Farmer Dashboard
      </h1>

      {/* Product Approval Box */}
      <div className="p-4 bg-lime-50 rounded-xl shadow mb-6 max-h-72 overflow-y-auto">
        <h2 className="text-xl font-bold text-lime-700 mb-4">
          Product Approval Requests
        </h2>
        {requests.length === 0 && (
          <p className="text-lime-700">No pending requests.</p>
        )}
        {requests.map((req) => (
          <div
            key={req.id}
            className="flex flex-col md:flex-row md:items-center justify-between mb-3 p-3 border rounded-lg bg-lime-100"
          >
            <div>
              <p>
                <strong>Product:</strong> {req.product}
              </p>
              <p>
                <strong>Quantity:</strong> {req.quantity} kg
              </p>
              <p>
                <strong>Unit Price:</strong> Tk {req.unitPrice}
              </p>
              <p>
                <strong>Buyer:</strong> {req.buyer}
              </p>
            </div>
            <button
              onClick={() => handleApprove(req.id)}
              className="mt-2 md:mt-0 py-2 px-4 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition"
            >
              Approve
            </button>
          </div>
        ))}
      </div>

      {/* Products Sales Summary */}
      <div className="p-4 bg-lime-50 rounded-xl shadow mb-6 max-h-96 overflow-y-auto">
        <h2 className="text-xl font-bold text-lime-700 mb-4">Products Sales Summary</h2>
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="border-b border-lime-300">
              <th className="p-2">Product</th>
              <th className="p-2">Quantity (kg)</th>
              <th className="p-2">Unit Price (Tk)</th>
              <th className="p-2">Total Price (Tk)</th>
              <th className="p-2">Status</th>
              <th className="p-2">Buyer</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-lime-200">
                <td className="p-2">{product.name}</td>
                <td className="p-2">{product.quantity}</td>
                <td className="p-2">{product.unitPrice.toFixed(2)}</td>
                <td className="p-2">{product.totalPrice.toFixed(2)}</td>
                <td
                  className={`p-2 font-semibold ${
                    product.status === "Approved" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {product.status === "Approved" ? "Approved" : "Pending"}
                </td>
                <td className="p-2">{product.buyer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Sales */}
      <div className="p-4 bg-lime-50 rounded-xl shadow">
        <h2 className="text-xl font-bold text-lime-700 mb-2">Total Sales</h2>
        <p className="text-lime-800 text-lg font-semibold">
          Tk {totalSales.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

export default Dashboard;