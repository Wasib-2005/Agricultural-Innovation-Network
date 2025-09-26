import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";
import { addToCart } from "../../utils/cartUtils";
import Cart from "./Cart";

function Product() {
  const { productID } = useParams();
  const { userData } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/get/product/${productID}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productID]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/comments/${productID}`
        );
        setComments(res.data.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    if (productID) fetchComments();
  }, [productID]);

  const handleCommentSubmit = async () => {
    if (userComment.trim() === "") return;
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/comments`, {
        productId: productID,
        user: userData?.displayName || userData?.email || "Anonymous",
        comment: userComment,
      });
      setUserComment("");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/comments/${productID}`
      );
      setComments(res.data.comments || []);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-lime-700">Loading product...</p>
    );
  if (!product)
    return <p className="text-center mt-10 text-red-600">Product not found</p>;

  return (
    <motion.div
      className="w-[92%] md:w-[95%] bg-lime-100 rounded-2xl shadow-lg border border-lime-300 overflow-hidden hover:shadow-xl transition duration-300 mt-6 mx-auto p-4"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0px 8px 20px rgba(132, 204, 22, 0.5)",
      }}
    >
      <div className="flex flex-col md:flex-row text-black p-2">
        {/* Image */}
        <motion.div className="h-[300px] md:h-[400px] rounded-2xl m-[5px] md:w-[40%] bg-lime-200 flex justify-center items-center overflow-hidden">
          <img
            src={product.productImg}
            alt={product.productName}
            className="w-[100%] object-contain"
          />
        </motion.div>

        {/* Details */}
        <div className="p-4 md:p-8 flex-1 flex flex-col justify-between">
          <div className="grid gap-3">
            <h2 className="text-2xl md:text-3xl font-bold text-lime-800">
              {product.productName}
            </h2>
            <hr className="border-dashed border-lime-500" />
            <p className="text-sm md:text-base text-lime-700">
              {product.productDescription}
            </p>
            <hr className="border-dashed border-lime-500" />

            {/* Stock status */}
            <div className="flex gap-3">
              <p>Category: {product?.productCategory}</p>
              <p
                className={
                  product.productQuantity <= 0
                    ? "text-red-600 font-medium"
                    : "text-blue-600 font-medium"
                }
              >
                {product.productQuantity <= 0 ? "Stock Out" : "In Stock"} (
                {product.productQuantity})
              </p>
            </div>
          </div>

          {/* Price + Buttons */}
          <div className="grid md:flex gap-2 justify-between items-center mt-4">
            <p className="flex gap-2 text-xl font-semibold text-lime-900">
              ৳ {product.productPrice} <span className="text-lg">per KG</span>
            </p>
            <div className="flex gap-2">
              <motion.button
                onClick={() =>
                  addToCart({
                    id: product._id,
                    name: product.productName,
                    price: product.productPrice,
                  })
                }
                className="px-4 py-2 rounded-lg bg-lime-500 text-white font-medium transition transform hover:bg-lime-600 hover:scale-105"
              >
                Add to Cart
              </motion.button>
            </div>
          </div>

          {/* Comments section */}
          <div className="mt-6">
            <textarea
              className="w-full p-3 border border-lime-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm"
              rows={3}
              placeholder="Write a comment..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-3 px-5 py-2 rounded-lg bg-lime-500 text-white font-medium transition transform hover:bg-lime-600 hover:scale-105"
            >
              Submit
            </button>

            <div className="mt-6 space-y-2">
              {comments.length > 0 ? (
                comments.map((cmt, idx) => (
                  <p
                    key={idx}
                    className="text-sm text-lime-700 italic border-b border-lime-200 pb-1"
                  >
                    💬 <span className="font-semibold">{cmt.user}:</span>{" "}
                    {cmt.comment}
                  </p>
                ))
              ) : (
                <p className="text-gray-500 italic">No comments yet.</p>
              )}
            </div>
          </div>
        </div>
        <Cart />
      </div>
    </motion.div>
  );
}

export default Product;
