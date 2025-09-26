import React, { useState } from "react";

function VlogPage() {
  const [vlogs, setVlogs] = useState([
    // Original 17 vlogs
    {
      id: 1,
      title: "Smart Irrigation Systems",
      author: "Dr. Arafat Rahman",
      fullDesc:
        "Smart irrigation uses IoT sensors, drip systems, and AI-based monitoring to save water and increase yields.",
      thumbnail:
        "https://images.unsplash.com/photo-1600456899122-d2ecf2fa0a6f?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    {
      id: 2,
      title: "Future of Organic Farming",
      author: "Dr. Shahariar Islam Rafi",
      fullDesc:
        "Organic farming avoids harmful chemicals, promotes biodiversity, and enhances soil fertility.",
      thumbnail:
        "https://images.unsplash.com/photo-1615485294145-4c759ee9d94f?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    // ... add all original vlogs 3–17 here
    // New 10 vlogs
    {
      id: 18,
      title: "Mulching Techniques",
      author: "Dr. Arafat Rahman",
      fullDesc:
        "Learn how mulching conserves moisture, suppresses weeds, and improves soil health.",
      thumbnail:
        "https://images.unsplash.com/photo-1581094655367-3e7b3a0a98a1?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    {
      id: 19,
      title: "Organic Pest Control",
      author: "Dr. Shahariar Islam Rafi",
      fullDesc:
        "Discover eco-friendly ways to control pests without chemicals.",
      thumbnail:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    {
      id: 20,
      title: "Rainwater Harvesting",
      author: "Dr. Arafat Rahman",
      fullDesc:
        "Techniques to collect and store rainwater for irrigation and sustainability.",
      thumbnail:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    {
      id: 21,
      title: "Soil pH Management",
      author: "Dr. Shahariar Islam Rafi",
      fullDesc: "How to test and adjust soil pH for better crop productivity.",
      thumbnail:
        "https://images.unsplash.com/photo-1581091870620-9c4d89a7a6f1?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    {
      id: 22,
      title: "Integrated Farming Systems",
      author: "Dr. Arafat Rahman",
      fullDesc:
        "Combine crops, livestock, and fish farming for sustainable yield.",
      thumbnail:
        "https://images.unsplash.com/photo-1598514983883-cdfb69f1bc32?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    {
      id: 23,
      title: "Solar-Powered Agriculture",
      author: "Dr. Shahariar Islam Rafi",
      fullDesc:
        "Using solar energy to power irrigation pumps and farm machinery.",
      thumbnail:
        "https://images.unsplash.com/photo-1615485294145-4c759ee9d94f?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    {
      id: 24,
      title: "Farm Waste Management",
      author: "Dr. Arafat Rahman",
      fullDesc:
        "Convert farm waste into compost and bio-energy for a zero-waste farm.",
      thumbnail:
        "https://images.unsplash.com/photo-1581094655367-3e7b3a0a98a1?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    {
      id: 25,
      title: "Climate-Smart Agriculture",
      author: "Dr. Shahariar Islam Rafi",
      fullDesc:
        "Adapt farming methods to mitigate the effects of climate change.",
      thumbnail:
        "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    {
      id: 26,
      title: "Precision Farming Tools",
      author: "Dr. Arafat Rahman",
      fullDesc: "Use GPS, sensors, and data analytics for optimized farming.",
      thumbnail:
        "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
    {
      id: 27,
      title: "Urban Gardening Tips",
      author: "Dr. Shahariar Islam Rafi",
      fullDesc: "Grow fresh produce in small urban spaces efficiently.",
      thumbnail:
        "https://images.unsplash.com/photo-1581091870620-9c4d89a7a6f1?auto=format&fit=crop&w=600&q=80",
      likes: 0,
      dislikes: 0,
      userVote: null,
    },
  ]);

  const [expanded, setExpanded] = useState(null);
  const [newVlog, setNewVlog] = useState({
    title: "",
    fullDesc: "",
    thumbnail: "",
    author: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);
  const handleChange = (e) =>
    setNewVlog({ ...newVlog, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newVlog.title ||
      !newVlog.fullDesc ||
      !newVlog.thumbnail ||
      !newVlog.author
    ) {
      alert("Please fill in all fields.");
      return;
    }
    const vlogToAdd = {
      ...newVlog,
      id: vlogs.length + 1,
      likes: 0,
      dislikes: 0,
      userVote: null,
    };
    setVlogs([vlogToAdd, ...vlogs]);
    setNewVlog({ title: "", fullDesc: "", thumbnail: "", author: "" });
    setShowForm(false);
  };

  const handleVote = (id, type) => {
    setVlogs(
      vlogs.map((vlog) => {
        if (vlog.id === id) {
          let likes = vlog.likes;
          let dislikes = vlog.dislikes;
          let userVote = vlog.userVote;

          if (type === "like") {
            if (userVote === "like") {
              likes--;
              userVote = null;
            } else {
              likes++;
              if (userVote === "dislike") dislikes--;
              userVote = "like";
            }
          } else if (type === "dislike") {
            if (userVote === "dislike") {
              dislikes--;
              userVote = null;
            } else {
              dislikes++;
              if (userVote === "like") likes--;
              userVote = "dislike";
            }
          }
          return { ...vlog, likes, dislikes, userVote };
        }
        return vlog;
      })
    );
  };

  // 🔹 Filter vlogs by title OR author
  const filteredVlogs = vlogs.filter(
    (vlog) =>
      vlog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vlog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-[95%] mx-auto mt-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-lime-800 text-center mb-6">
        Blogs 📝
      </h1>

      {/* Top Section: Upload Form + Search */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="lg:w-1/2">
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full px-6 py-2 rounded-lg bg-lime-600 text-white font-semibold hover:bg-lime-700 transition"
          >
            {showForm ? "Close Upload Form" : "Upload New Vlog"}
          </button>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-lime-100 border-lime-400 border rounded-2xl p-6 mt-4 shadow-md"
            >
              <h2 className="text-2xl font-bold text-lime-800 mb-4">
                ✍ Upload a New Vlog
              </h2>
              <input
                type="text"
                name="author"
                value={newVlog.author}
                onChange={handleChange}
                placeholder="Author Name"
                className="w-full p-3 border rounded-lg mb-3 focus:outline-lime-500"
              />
              <input
                type="text"
                name="title"
                value={newVlog.title}
                onChange={handleChange}
                placeholder="Vlog Title"
                className="w-full p-3 border rounded-lg mb-3 focus:outline-lime-500"
              />
              <input
                type="text"
                name="thumbnail"
                value={newVlog.thumbnail}
                onChange={handleChange}
                placeholder="Thumbnail Image URL"
                className="w-full p-3 border rounded-lg mb-3 focus:outline-lime-500"
              />
              <textarea
                name="fullDesc"
                value={newVlog.fullDesc}
                onChange={handleChange}
                placeholder="Full Description"
                className="w-full p-3 border rounded-lg mb-3 focus:outline-lime-500"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-lime-700 text-white font-medium hover:bg-lime-800 transition"
              >
                Upload Vlog
              </button>
            </form>
          )}
        </div>

        <div className="lg:w-1/2 flex flex-col justify-center">
          <div className="bg-lime-50 border border-lime-300 rounded-2xl p-4 shadow-md">
            <span className="text-lime-700 font-semibold mb-2 block">
              Search by title or author 🌱
            </span>
            <input
              type="text"
              placeholder="Enter vlog title or author name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-lime-400 rounded-lg focus:outline-lime-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVlogs.map((vlog) => (
          <div
            key={vlog.id}
            className="bg-lime-100 rounded-2xl shadow-lg border border-lime-300 overflow-hidden hover:shadow-xl transition-all duration-500"
          >
            <div className="h-[180px] overflow-hidden">
              <img
                src={vlog.thumbnail}
                alt={vlog.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-4">
              <h2 className="text-xl font-bold text-lime-800">{vlog.title}</h2>
              <p className="text-sm text-lime-600 font-medium">
                By: {vlog.author}
              </p>
              <p className="text-sm text-lime-700 mt-2">
                {expanded === vlog.id
                  ? vlog.fullDesc
                  : vlog.fullDesc.slice(0, 120) + "..."}
              </p>

              <button
                onClick={() => toggleExpand(vlog.id)}
                className="mt-3 px-4 py-2 rounded-lg bg-lime-500 text-white font-medium hover:bg-lime-600 transition"
              >
                {expanded === vlog.id ? "Show Less" : "Read More"}
              </button>

              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => handleVote(vlog.id, "like")}
                  className={`px-3 py-1 border rounded-lg font-medium hover:bg-lime-200 transition ${
                    vlog.userVote === "like" ? "bg-lime-300" : ""
                  }`}
                >
                  👍 {vlog.likes}
                </button>
                <button
                  onClick={() => handleVote(vlog.id, "dislike")}
                  className={`px-3 py-1 border rounded-lg font-medium hover:bg-lime-200 transition ${
                    vlog.userVote === "dislike" ? "bg-lime-300" : ""
                  }`}
                >
                  👎 {vlog.dislikes}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VlogPage;
