import React from "react";

function OfficerProfile({ user }) {
  return (
    <div className="w-[95%] md:w-[70%] mx-auto mt-6 p-6 bg-lime-100 rounded-2xl shadow-lg">
      <h1 className="text-4xl font-extrabold text-lime-900 mb-6 text-center">
        👮 Officer Profile
      </h1>

      {/* Officer Info */}
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
          <h2 className="text-3xl font-bold mb-3">Professional Info</h2>
          <p className="text-lg">
            <strong>Department:</strong> {user.department}
          </p>
          <p className="text-lg">
            <strong>Position:</strong> {user.position}
          </p>
          <p className="text-lg">
            <strong>Experience:</strong> {user.experience}
          </p>
          <p className="text-lg">
            <strong>Degree:</strong> {user.degree}
          </p>
          <p className="text-lg">
            <strong>Institution:</strong> {user.institution}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OfficerProfile;
