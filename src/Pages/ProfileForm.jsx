import React, { useState } from "react";

function ProfileForm() {
  const [category, setCategory] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});

  const [farmer, setFarmer] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
    phone: "",
    region: "",
    farmSize: "",
    crops: "",
  });

  const [officer, setOfficer] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    department: "",
    position: "",
    experience: "",
    region: "",
    degree: "",
    institution: "",
  });

  const [consumer, setConsumer] = useState({
    name: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    address: "",
    preferences: "",
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) setAvatar(URL.createObjectURL(file));
  };

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
      let value;
      if (category === "Farmer") value = farmer[field];
      if (category === "Officer") value = officer[field];
      if (category === "Consumer") value = consumer[field];

      if (!value || value.toString().trim() === "") {
        tempErrors[field] = "This field is required";
      }
    });

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    let userData = {};
    if (category === "Farmer") {
      userData = { ...farmer, role: "farmer" };
    } else if (category === "Officer") {
      userData = { ...officer, role: "officer" };
    } else if (category === "Consumer") {
      userData = { ...consumer, role: "consumer" };
    }

    try {
      const res = await fetch("http://localhost:5000/create_user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          role: userData.role,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        alert("User created successfully!");
      } else if (res.status === 409) {
        alert("Email already exists!");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  const renderGenderSelect = (value, onChange) => (
    <select
      value={value}
      onChange={onChange}
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-lime-500 focus:ring-2 focus:ring-lime-400 text-gray-800 bg-white"
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
          type={
            field === "age" ? "number" : field === "email" ? "email" : "text"
          }
          name={field}
          value={value}
          onChange={(e) => handleChange(e, type)}
          className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-lime-500 focus:ring-2 focus:ring-lime-400 text-gray-800 bg-white ${
            errors[field] ? "border-red-600" : ""
          }`}
        />
      )}
      {errors[field] && (
        <span className="text-red-600 text-sm">{errors[field]}</span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 to-lime-200 p-4">
      <div className="w-[90%] max-w-4xl mx-auto mt-6 p-6 bg-gradient-to-br from-lime-50 to-lime-100 rounded-2xl shadow-lg">
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
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-lime-500 focus:ring-2 focus:ring-lime-400 text-gray-800 bg-white"
          >
            <option value="">-- Select --</option>
            <option value="Farmer">Farmer</option>
            <option value="Officer">Officer</option>
            <option value="Consumer">Consumer</option>
          </select>
        </div>

        {category && (
          <div className="flex flex-col items-center mb-6">
            <div className="w-32 h-32 rounded-full border-4 border-lime-400 overflow-hidden shadow-lg mb-2">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-lime-300 text-lime-700 font-bold">
                  No Photo
                </div>
              )}
            </div>
            <label className="cursor-pointer bg-lime-600 text-white px-4 py-2 rounded-lg shadow hover:bg-lime-700 transition">
              Upload Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          </div>
        )}

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
