import React, { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router";

function ProfileForm() {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState({});
  const { userData } = useContext(UserContext);

  const [farmer, setFarmer] = useState({
    name: userData?.displayName || "",
    email: userData?.email || "",
    age: "",
    gender: "",
    phone: "",
    region: "",
    farmSize: "",
    crops: "",
  });

  const [officer, setOfficer] = useState({
    name: userData?.displayName || "",
    email: userData?.email || "",
    age: "",
    gender: "",
    phone: "",
    department: "",
    position: "",
    experience: "",
    region: "",
    degree: "",
    institution: "",
  });

  const [consumer, setConsumer] = useState({
    name: userData?.displayName || "",
    email: userData?.email || "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    preferences: "",
  });

  const handleChange = (e, type) => {
    const { name, value } = e.target;
    if (type === "farmer") setFarmer({ ...farmer, [name]: value });
    if (type === "officer") setOfficer({ ...officer, [name]: value });
    if (type === "consumer") setConsumer({ ...consumer, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    let fields = [];
    if (category === "Farmer") fields = Object.keys(farmer);
    if (category === "Officer") fields = Object.keys(officer);
    if (category === "Consumer") fields = Object.keys(consumer);

    fields.forEach((field) => {
      let value =
        category === "Farmer"
          ? farmer[field]
          : category === "Officer"
          ? officer[field]
          : consumer[field];
      if (!value || value.toString().trim() === "")
        tempErrors[field] = "This field is required";
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let userDataPayload =
      category === "Farmer"
        ? { ...farmer, role: "farmer" }
        : category === "Officer"
        ? { ...officer, role: "officer" }
        : { ...consumer, role: "consumer" };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/create_user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDataPayload),
      });
      const data = await res.json();
      if (res.status === 201) navigate("/");
      else if (res.status === 409) alert("Email already exists!");
      else alert(data.message || "Something went wrong");
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const renderGenderSelect = (value, onChange) => (
    <select
      value={value || ""}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  );

  const renderField = (field, type, value) => (
    <div key={field}>
      <label className="block mb-1 font-semibold text-lime-700">
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </label>
      {field === "gender" ? (
        renderGenderSelect(value, (e) =>
          handleChange(
            { target: { name: "gender", value: e.target.value } },
            type
          )
        )
      ) : (
        <input
          type={field === "age" ? "number" : "text"}
          name={field}
          value={value || ""}
          onChange={(e) => handleChange(e, type)}
          className={`w-full p-3 border ${
            errors[field] ? "border-red-600" : "border-gray-300"
          } rounded-lg text-gray-800`}
        />
      )}
      {errors[field] && (
        <span className="text-red-600 text-sm">{errors[field]}</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 to-lime-200 p-4">
      <div className="w-[90%] max-w-4xl mx-auto p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-extrabold text-lime-800 mb-6 text-center">
          📋 User Profile Form
        </h1>

        <div className="mb-6">
          <label className="block mb-1 font-semibold text-lime-800">
            Select Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
          >
            <option value="">-- Select --</option>
            <option value="Farmer">Farmer</option>
            <option value="Officer">Officer</option>
            <option value="Consumer">Consumer</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {category === "Farmer" && (
            <div className="p-4 bg-lime-50 rounded-xl shadow space-y-4">
              <h2 className="text-xl font-bold text-lime-700 mb-4">
                Farmer Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(farmer).map((field) =>
                  renderField(field, "farmer", farmer[field])
                )}
              </div>
            </div>
          )}

          {category === "Officer" && (
            <div className="p-4 bg-lime-50 rounded-xl shadow space-y-4">
              <h2 className="text-xl font-bold text-lime-700 mb-4">
                Officer Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(officer).map((field) =>
                  renderField(field, "officer", officer[field])
                )}
              </div>
            </div>
          )}

          {category === "Consumer" && (
            <div className="p-4 bg-lime-50 rounded-xl shadow space-y-4">
              <h2 className="text-xl font-bold text-lime-700 mb-4">
                Consumer Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.keys(consumer).map((field) =>
                  renderField(field, "consumer", consumer[field])
                )}
              </div>
            </div>
          )}

          {category && (
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-lime-600 text-white font-semibold hover:bg-lime-700 transition"
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
