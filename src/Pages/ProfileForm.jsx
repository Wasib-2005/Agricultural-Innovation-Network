import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../Contexts/UserContext";
import { useNavigate } from "react-router";

function ProfileForm() {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const [category, setCategory] = useState(userData?.role || "");
  const [errors, setErrors] = useState({});
  const [formFields, setFormFields] = useState({});
  
  const categoryFields = {
    Farmer: ["name", "email", "age", "gender", "phone", "region", "farmSize", "crops"],
    Officer: ["name", "email", "age", "gender", "phone", "department", "position", "experience", "region", "degree", "institution"],
    Consumer: ["name", "email", "age", "gender", "phone", "address", "preferences"]
  };

  useEffect(() => {
    if (category) {
      const fields = {};
      categoryFields[category].forEach(field => {
        fields[field] = userData?.[field] || "";
      });
      setFormFields(fields);
    }
  }, [category, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    Object.keys(formFields).forEach(field => {
      if (!formFields[field] || formFields[field].toString().trim() === "") {
        tempErrors[field] = "This field is required";
      }
    });
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userDataPayload = { ...formFields, role: category };

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

  const renderGenderSelect = () => (
    <select
      name="gender"
      value={formFields.gender || ""}
      onChange={handleChange}
      className="w-full p-3 border border-gray-300 rounded-lg text-gray-800"
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>
  );

  const renderField = (field) => (
    <div key={field}>
      <label className="block mb-1 font-semibold text-lime-700">
        {field.charAt(0).toUpperCase() + field.slice(1)}
      </label>
      {field === "gender" ? (
        renderGenderSelect()
      ) : (
        <input
          type={field === "age" ? "number" : "text"}
          name={field}
          value={formFields[field] || ""}
          onChange={handleChange}
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

        {category && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 bg-lime-50 rounded-xl shadow space-y-4">
              <h2 className="text-xl font-bold text-lime-700 mb-4">
                {category} Info
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryFields[category].map((field) => renderField(field))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-lime-600 text-white font-semibold hover:bg-lime-700 transition"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default ProfileForm;
