import React, { useState, useEffect, useMemo } from "react";

// Crop categories and default expense lines
const cropCategories = {
  Vegetables: {
    Tomato: [
      "Cost of Tomato Seeds",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Other Expenses",
    ],
    Potato: [
      "Cost of Potato Seeds",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Other Expenses",
    ],
    Chili: [
      "Cost of Chili Seeds",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Other Expenses",
    ],
  },
  Cereals: {
    Rice: [
      "Cost of Rice Seeds",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Harvesting Cost",
      "Other Expenses",
    ],
    Wheat: [
      "Cost of Wheat Seeds",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Harvesting Cost",
      "Other Expenses",
    ],
    Maize: [
      "Cost of Maize Seeds",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Harvesting Cost",
      "Other Expenses",
    ],
  },
  Fruits: {
    Mango: [
      "Cost of Mango Saplings",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Other Expenses",
    ],
    Banana: [
      "Cost of Banana Saplings",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Other Expenses",
    ],
    Orange: [
      "Cost of Orange Saplings",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Other Expenses",
    ],
  },
  Legumes: {
    Lentil: [
      "Cost of Lentil Seeds",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Other Expenses",
    ],
    Chickpea: [
      "Cost of Chickpea Seeds",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Other Expenses",
    ],
    Pea: [
      "Cost of Pea Seeds",
      "Cost of Fertilizer",
      "Cost of Irrigation",
      "Labor Cost",
      "Cost of Pesticides",
      "Other Expenses",
    ],
  },
};

function formatTk(value) {
  if (isNaN(value)) return "0.00";
  return Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CropCalculator() {
  const [category, setCategory] = useState("Vegetables");
  const [crop, setCrop] = useState("Tomato");
  // store costs as strings to allow empty inputs; parse when computing
  const [costs, setCosts] = useState({});
  const [missingCosts, setMissingCosts] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [duration, setDuration] = useState(0);
  const [result, setResult] = useState(null);

  // computed list of expense lines for selected crop
  const expenseLines = useMemo(() => {
    return cropCategories[category] && cropCategories[category][crop]
      ? [...cropCategories[category][crop]]
      : [];
  }, [category, crop]);

  // Initialize costs when crop/category changes
  useEffect(() => {
    const initial = {};
    expenseLines.forEach((line) => (initial[line] = ""));
    setCosts(initial);
    setMissingCosts([]);
    setResult(null);
  }, [expenseLines]);

  const handleCostChange = (e) => {
    const { name, value } = e.target;
    // allow only numbers and dot in input (we don't force parsing here)
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setCosts((c) => ({ ...c, [name]: value }));
    }
  };

  // compute duration when dates change
  useEffect(() => {
    if (!startDate || !endDate) {
      setDuration(0);
      return;
    }
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start) || isNaN(end) || end < start) {
      setDuration(0);
      return;
    }
    // compute inclusive days
    const msPerDay = 1000 * 60 * 60 * 24;
    const diff = Math.floor((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / msPerDay) + 1;
    setDuration(diff);
  }, [startDate, endDate]);

  // Auto-calculate when costs/dates are updated
  useEffect(() => {
    if (!crop || !startDate || !endDate || duration <= 0) {
      setResult(null);
      return;
    }

    // required fields are every field except ones that include "Other"
    const required = Object.keys(costs).filter((k) => !/other/i.test(k));
    const missing = required.filter((step) => {
      const val = parseFloat(costs[step]);
      return isNaN(val) || val <= 0;
    });

    if (missing.length > 0) {
      setMissingCosts(missing);
      setResult(null);
      return;
    } else {
      setMissingCosts([]);
    }

    const totalCost = Object.keys(costs).reduce((acc, key) => {
      const v = parseFloat(costs[key]);
      return acc + (isNaN(v) ? 0 : v);
    }, 0);

    const suggestedSellingPrice = totalCost * 1.2; // 20% profit
    const suggestedSavings = suggestedSellingPrice * 0.05; // 5% savings
    const profit = suggestedSellingPrice - totalCost;

    setResult({ totalCost, suggestedSellingPrice, profit, suggestedSavings });
  }, [costs, duration, crop, startDate, endDate]);

  // helpers
  const handleAddCustomExpense = () => {
    const baseName = "Custom Expense";
    let idx = 1;
    let name = `${baseName} ${idx}`;
    while (costs[name] !== undefined) {
      idx += 1;
      name = `${baseName} ${idx}`;
    }
    setCosts((c) => ({ ...c, [name]: "" }));
  };

  const handleRemoveExpense = (name) => {
    setCosts((c) => {
      const copy = { ...c };
      delete copy[name];
      return copy;
    });
  };

  const handleReset = () => {
    const initial = {};
    expenseLines.forEach((line) => (initial[line] = ""));
    setCosts(initial);
    setStartDate("");
    setEndDate("");
    setDuration(0);
    setResult(null);
    setMissingCosts([]);
  };

  return (
    <div className="w-[95%] mx-auto mt-6 p-6 bg-lime-100 rounded-2xl shadow-lg">
      <h1 className="text-3xl font-extrabold text-lime-800 mb-6 text-center">🌾 Crop Cost & Profit Calculator</h1>

      {/* Category & Crop pickers */}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-semibold text-lime-800">Select Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-lime-500">
            {Object.keys(cropCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold text-lime-800">Select Crop</label>
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-lime-500">
            {cropCategories[category] && Object.keys(cropCategories[category]).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Duration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block mb-1 font-semibold text-lime-800">Start Date</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-lime-500" />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-lime-800">End Date</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full p-3 border rounded-lg focus:outline-lime-500" />
        </div>
      </div>

      {/* Cost Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {Object.keys(costs).map((step) => (
          <div key={step} className="flex flex-col">
            <div className="flex items-center gap-2">
              <input
                type="text"
                name={step}
                value={step}
                readOnly
                className="flex-1 p-2 text-sm bg-transparent border-0"
              />
              <button type="button" onClick={() => handleRemoveExpense(step)} className="text-sm text-red-600">Remove</button>
            </div>
            <input
              type="number"
              name={step}
              value={costs[step]}
              onChange={handleCostChange}
              placeholder="Amount (Tk)"
              min="0"
              step="0.01"
              className={`w-full p-3 border rounded-lg focus:outline-lime-500 ${missingCosts.includes(step) ? "border-red-600" : ""}`}
            />
            {missingCosts.includes(step) && <span className="text-red-600 text-sm mt-1">Required</span>}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <button type="button" onClick={handleAddCustomExpense} className="px-4 py-2 rounded-xl bg-lime-600 text-white">+ Add Custom Expense</button>
        <button type="button" onClick={handleReset} className="px-4 py-2 rounded-xl border">Reset</button>
      </div>

      {/* Result Section */}
      {result ? (
        <div className="bg-lime-100 p-4 rounded-xl shadow-inner">
          <h2 className="text-2xl font-bold text-lime-800 mb-4">{crop} Summary</h2>
          <p className="text-lime-700 mb-2">🌱 Total Cost: Tk {formatTk(result.totalCost)}</p>
          <p className="text-lime-700 mb-2">💵 Suggested Selling Price (20% profit): Tk {formatTk(result.suggestedSellingPrice)}</p>
          <p className="text-lime-700 mb-2">📈 Expected Profit: Tk {formatTk(result.profit)}</p>
          <p className="text-lime-700 mb-2">💰 Suggested Savings (5%): Tk {formatTk(result.suggestedSavings)}</p>
          <p className={`mt-3 font-semibold ${result.profit >= 0 ? "text-green-600" : "text-red-600"}`}>{result.profit >= 0 ? "✅ You will be profitable!" : "⚠️ You may incur loss!"}</p>
          <p className="mt-2 text-sm text-lime-700">⏳ Duration: {duration} day{duration !== 1 ? "s" : ""}</p>
        </div>
      ) : (
        <div className="p-4 rounded-xl border-dashed border-2 border-lime-200 text-lime-700 mb-6">
          <p>Please fill required expenses and valid start/end dates to see results.</p>
        </div>
      )}
    </div>
  );
}
