import React from "react";

function FarmerProfile({ user }) {
  return (
    <div className="w-[95%] md:w-[70%] mx-auto mt-6 p-6 bg-lime-100 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-lime-900 mb-6 text-center">
        👨‍🌾 Farmer Profile
      </h1>

      {/* Farmer Info */}
      <div className="grid gap-6 text-lime-900">
        <div className="p-6 bg-lime-50 shadow rounded-xl">
          <h2 className="text-3xl font-bold mb-3">Personal Info</h2>
          <p className="text-lg">
            <strong>Name:</strong> {user.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="text-lg">
            <strong>Role:</strong> {user.role}
          </p>
          <p className="text-lg">
            <strong>Age:</strong> {user.age}
          </p>
          <p className="text-lg">
            <strong>Gender:</strong> {user.gender}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {user.phone}
          </p>
          <p className="text-lg">
            <strong>Region:</strong> {user.region}
          </p>
        </div>

        <div className="p-6 bg-lime-50 shadow rounded-xl">
          <h2 className="text-3xl font-bold mb-3">Farming Info</h2>
          <p className="text-lg">
            <strong>Farm Size:</strong> {user.farmSize}
          </p>
          <p className="text-lg">
            <strong>Main Crops:</strong> {user.crops}
          </p>
        </div>
      </div>
    </div>
  );
}

export default FarmerProfile;
