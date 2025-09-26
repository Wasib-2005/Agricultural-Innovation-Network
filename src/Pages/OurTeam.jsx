import React from "react";

function OurTeam() {
  const teamMembers = [
    {
      id: 1,
      name: "Wasibul Islam Wasib",
      title: "Full Stack Developer",
      photo:
        "../public/wasib.jpg",
      email: "wasibulislam8984@gmail.com",
      phone: "+880 1855-005875",
    },
    {
      id: 2,
      name: "Md Shahariar Islam Rafi",
      title: "Full Stack Developer & Researcher",
      photo:
        "../public/rafi.jpeg",
      email: "rafishake6233@gmail.com",
      phone: "+880 1960-470590",
    },
    {
      id: 3,
      name: "Arafat Rahman",
      title: "Frontend Developer & UI/UX Designer",
      photo:
        "../public/arafat.jpeg",
      email: "arafatrahman0092@gmail.com",
      phone: "+880 1701-2722099",
    },
  ];

  return (
    <div className="h-[100vh] grid justify-center items-center bg-gradient-to-br from-lime-100 to-lime-300">
      <div className="w-[95%] mx-auto p-6 bg-lime-200 rounded-3xl shadow-xl">
        <h1 className="text-5xl font-extrabold text-lime-900 text-center mb-12">
          👨‍💻 Development Team
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className={`
                bg-white rounded-3xl shadow-xl overflow-hidden p-6 flex flex-col items-center text-center 
                transform transition duration-500 hover:scale-105 hover:shadow-2xl
                ${member.id === 2 ? "order-first md:order-none" : ""}
                `}
            >
              <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-lime-400 to-lime-600 mb-4">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-lime-900">
                {member.name}
              </h2>
              <p className="text-lime-700 mt-2 text-lg">{member.title}</p>

              {/* Contact information */}
              <div className="mt-4 text-lime-800 space-y-1">
                <p>
                  Email:{" "}
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-lime-600"
                  >
                    {member.email}
                  </a>
                </p>
                <p>
                  Phone:{" "}
                  <a
                    href={`tel:${member.phone}`}
                    className="hover:text-lime-600"
                  >
                    {member.phone}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OurTeam;
