import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [newBlog, setNewBlog] = useState({
    title: "",
    fullDesc: "",
    thumbnail: "",
    author: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch blogs from the backend
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/blogs`) // API to fetch blogs
      .then((response) => {
        setBlogs(response.data); // Set blogs in state
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  const toggleExpand = (id) => setExpanded(expanded === id ? null : id);

  const handleChange = (e) =>
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !newBlog.title ||
      !newBlog.fullDesc ||
      !newBlog.thumbnail ||
      !newBlog.author
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Post the new blog to the backend
    axios
      .post(`${import.meta.env.VITE_API_URL}/api/blogs`, newBlog) // API to post new blog
      .then((response) => {
        setBlogs([response.data, ...blogs]); // Add new blog to the list
        setNewBlog({ title: "", fullDesc: "", thumbnail: "", author: "" }); // Reset form
        setShowForm(false); // Close form
      })
      .catch((error) => {
        console.error("Error uploading blog:", error);
      });
  };

  const handleVote = async (id, type) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/blogs/${id}/vote/${type}`
      );

      setBlogs(
        blogs.map((blog) => {
          if (blog._id === id) {
            return response.data; // Update the blog with the latest vote data
          }
          return blog;
        })
      );
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  // Filter blogs based on search term (title or author)
  const filteredBlogs = blogs.filter(
    (blog) =>
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="w-[95%] mx-auto mt-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h1 className="text-3xl md:text-4xl font-extrabold text-lime-800 text-center mb-6">
        🌱 Agri-Scientist Blogs
      </h1>

      {/* Top Section: Upload Form + Search */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="lg:w-1/2">
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full px-6 py-2 rounded-lg bg-lime-600 text-white font-semibold hover:bg-lime-700 transition"
          >
            {showForm ? "Close Upload Form" : "Upload New Blog"}
          </button>

          {showForm && (
            <form
              onSubmit={handleSubmit}
              className="bg-lime-100 border-lime-400 border rounded-2xl p-6 mt-4 shadow-md"
            >
              <h2 className="text-2xl font-bold text-lime-800 mb-4">
                ✍ Upload a New Blog
              </h2>
              <input
                type="text"
                name="author"
                value={newBlog.author}
                onChange={handleChange}
                placeholder="Author Name"
                className="w-full p-3 border rounded-lg mb-3 focus:outline-lime-500 text-black"
              />
              <input
                type="text"
                name="title"
                value={newBlog.title}
                onChange={handleChange}
                placeholder="Blog Title"
                className="w-full p-3 border rounded-lg mb-3 focus:outline-lime-500 text-black"
              />
              <input
                type="text"
                name="thumbnail"
                value={newBlog.thumbnail}
                onChange={handleChange}
                placeholder="Thumbnail Image URL"
                className="w-full p-3 border rounded-lg mb-3 focus:outline-lime-500 text-black"
              />
              <textarea
                name="fullDesc"
                value={newBlog.fullDesc}
                onChange={handleChange}
                placeholder="Full Description"
                className="w-full p-3 border rounded-lg mb-3 focus:outline-lime-500 text-black"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-lime-700 text-white font-medium hover:bg-lime-800 transition"
              >
                Upload Blog
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
              placeholder="Enter blog title or author name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 border border-lime-400 rounded-lg focus:outline-lime-500 text-black"
            />
          </div>
        </div>
      </div>

      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.length === 0 ? (
          <p className="col-span-full text-center text-xl font-bold text-lime-800">
            No blogs found for "{searchTerm}"
          </p>
        ) : (
          filteredBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              className="bg-lime-100 rounded-2xl shadow-lg border border-lime-300 overflow-hidden hover:shadow-xl transition-all duration-500"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-[180px] overflow-hidden">
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h2 className="text-xl font-bold text-lime-800">{blog.title}</h2>
                <p className="text-sm text-lime-600 font-medium">
                  By: {blog.author}
                </p>
                <p className="text-sm text-lime-700 mt-2">
                  {expanded === blog._id
                    ? blog.fullDesc
                    : blog.fullDesc.slice(0, 120) + "..."}
                </p>

                <button
                  onClick={() => toggleExpand(blog._id)}
                  className="mt-3 px-4 py-2 rounded-lg bg-lime-500 text-white font-medium hover:bg-lime-600 transition"
                >
                  {expanded === blog._id ? "Show Less" : "Read More"}
                </button>

                <div className="mt-4 flex items-center gap-4">
                  <button
                    onClick={() => handleVote(blog._id, "like")}
                    className={`px-3 py-1 border rounded-lg font-medium hover:bg-lime-200 transition ${
                      blog.userVote === "like" ? "bg-lime-300" : ""
                    } border-lime-900 text-black`}
                  >
                    👍 <span className="font-bold">{blog.likes}</span>
                  </button>
                  <button
                    onClick={() => handleVote(blog._id, "dislike")}
                    className={`px-3 py-1 border rounded-lg font-medium hover:bg-lime-200 transition ${
                      blog.userVote === "dislike" ? "bg-lime-300" : ""
                    } border-lime-900 text-black`}
                  >
                    👎 <span className="font-bold">{blog.dislikes}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default BlogPage;
