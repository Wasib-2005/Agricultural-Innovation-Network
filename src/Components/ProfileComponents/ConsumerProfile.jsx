import React from "react";

function ConsumerProfile({ user }) {
  return (
    <div className="w-[95%] md:w-[70%] mx-auto mt-6 p-6 bg-lime-100 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-lime-900 mb-6 text-center">
        🛒 Consumer Profile
      </h1>

      {/* Personal Info */}
      <div className="p-6 bg-lime-50 shadow rounded-xl text-lime-900">
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
          <strong>Address:</strong> {user.address}
        </p>
      </div>

      {/* Preferences */}
      <div className="p-6 bg-lime-50 shadow rounded-xl text-lime-900 mt-6">
        <h2 className="text-3xl font-bold mb-3">Preferences</h2>
        {user.preferences ? (
          <ul className="list-disc list-inside text-lg">
            {user.preferences
              .split(";")
              .filter((pref) => pref.trim() !== "")
              .map((pref, index) => (
                <li key={index}>{pref}</li>
              ))}
          </ul>
        ) : (
          <p className="text-lg">No preferences listed</p>
        )}
      </div>
    </div>
  );
}

export default ConsumerProfile;
