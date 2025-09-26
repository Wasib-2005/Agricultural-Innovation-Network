import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Contexts/UserContext";

const MarketCard = ({ product }) => {
  const { userData } = useContext(UserContext);
  console.log(userData);
  const rating = product?.rating || 4;
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  const renderStars = (count) =>
    Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={i < count ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ));

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${product._id}?limit=5`
      );
      setComments(res.data || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setComments([]);
    }
  };

  const handleCommentSubmit = async () => {
    if (!userComment.trim()) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/comments`, {
        productId: product._id,
        user: userData?.displayName || userData?.email || "Anonymous", // replace with actual user if available
        comment: userComment,
      });

      setUserComment("");
      fetchComments(); // refresh after submitting
    } catch (err) {
      console.error("Error submitting comment:", err);
    }
  };

  useEffect(() => {
    if (product?._id) {
      fetchComments();
    }
  }, [product]);

  return (
    <motion.div
      className="w-[92%] md:w-[95%] bg-lime-100 rounded-2xl shadow-lg border border-lime-300 overflow-hidden hover:shadow-xl transition duration-300 mt-[20px] mx-auto"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 8px 20px rgba(132, 204, 22, 0.5)",
      }}
    >
      <div className="flex flex-col md:flex-row text-black">
        {/* Product Image */}
        <motion.div
          className="h-[200px] md:h-[300px] rounded-2xl m-[5px] md:w-[40%] bg-lime-200 flex justify-center items-center overflow-hidden"
          whileHover={{ scale: 1, rotate: .1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <img
            src={product?.productImg || ""}
            alt={product?.productName || "Product"}
            className="w-[100%] md:w-[100%] object-contain"
          />
        </motion.div>

        {/* Product Details */}
        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-lime-800">
              {product?.productName || "Product Name"}
            </h2>
            <p className="text-sm md:text-base text-lime-700 mt-1">
              {product?.productDescription?.slice(0, 250) ||
                "A short description of the product goes here."}
              {product?.productDescription?.length > 250 && (
                <span
                  className="text-blue-600 cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  {" "}
                  Read more...
                </span>
              )}
            </p>

            {/* Rating */}
            <div className="flex items-center mt-2">{renderStars(rating)}</div>
          </div>

          {/* Price and Buttons */}
          <div className="grid md:flex gap-2 justify-between items-center mt-4">
            <p className="flex gap-2">
              <span className="text-xl font-semibold text-lime-900">
                ৳ {product?.productPrice || "Stock Out"}
              </span>
              <span className="text-xl font-semibold text-lime-900">
                per KG
              </span>
            </p>
            <div className="flex gap-2">
              <motion.button
                onClick={() => navigate(`/product/${product._id}`)} // ✅ navigation
                className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium transition transform hover:bg-blue-300 hover:scale-105"
              >
                View Info
              </motion.button>
              <motion.button className="px-4 py-2 rounded-lg bg-lime-500 text-white font-medium transition transform hover:bg-lime-600 hover:scale-105">
                Add to Cart
              </motion.button>
            </div>
          </div>

          {/* Comment Section */}
          <div className="mt-4 flex flex-col">
            <textarea
              className="w-full p-2 border border-lime-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-lime-400"
              rows={2}
              placeholder="Write a comment..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-2 self-end px-4 py-2 rounded-lg bg-lime-500 text-white font-medium transition transform hover:bg-lime-600 hover:scale-105"
            >
              Submit
            </button>
          </div>

          {/* Comments List */}
          <div className="mt-4 max-h-40 overflow-y-auto">
            {(!comments.comments || comments.comments.length === 0) && (
              <p className="text-sm text-lime-700 italic">No comments yet</p>
            )}
            {comments.comments?.map((cmt, idx) => (
              <React.Fragment key={idx}>
                <p className="text-sm text-lime-700 italic mt-1 border-b border-lime-200 pb-1 hidden md:flex">
                  💬 {cmt?.user || "Anonymous"}:{" "}
                  {cmt?.comment?.slice(0, 150) || ""}
                </p>
                <p className="text-sm text-lime-700 italic mt-1 border-b border-lime-200 pb-1 md:hidden">
                  💬 {cmt?.comment?.slice(0, 50) || ""}
                </p>
              </React.Fragment>
            ))}

            {comments.comments?.length === 5 && (
              <p className="text-blue-500 cursor-pointer">See more</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MarketCard;
