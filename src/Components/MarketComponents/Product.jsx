import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../Contexts/UserContext";

function Product() {
  const { productID } = useParams();
  const { userData } = useContext(UserContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userComment, setUserComment] = useState("");
  const [comments, setComments] = useState([]);

  // ✅ Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.25:5000/get/product/${productID}`
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

  // ✅ Fetch comments for this product
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(
          `http://192.168.1.25:5000/comments/${productID}`
        );
        setComments(res.data.comments || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    if (productID) fetchComments();
  }, [productID]);

  // ✅ Render stars
  const renderStars = (count) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <span
          key={i}
          className={i < count ? "text-yellow-400" : "text-gray-300"}
        >
          ★
        </span>
      ));
  };

  // ✅ Handle comment submit
  const handleCommentSubmit = async () => {
    if (userComment.trim() === "") return;

    try {
      await axios.post("http://192.168.1.25:5000/comments", {
        productId: productID,
        user: userData?.displayName || userData?.email || "Anonymous", // replace with actual user if available

        comment: userComment,
      });

      // Clear input
      setUserComment("");

      // Re-fetch comments
      const res = await axios.get(
        `http://192.168.1.25:5000/comments/${productID}`
      );
      setComments(res.data.comments || []);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-10 text-lime-700">Loading product...</p>
    );
  }

  if (!product) {
    return <p className="text-center mt-10 text-red-600">Product not found</p>;
  }

  return (
    <div className="w-[95%] md:w-[90%] lg:w-[80%] bg-lime-100 rounded-2xl shadow-lg border border-lime-300 overflow-hidden hover:shadow-xl transition duration-300 mt-6 mx-auto p-4">
      <div className="grid gap-6">
        {/* Product Image */}
        <div className="w-full flex justify-center items-center bg-lime-200 rounded-2xl overflow-hidden p-4">
          <img
            src={product.productImg}
            alt={product.productName}
            className="w-full object-contain max-h-[300px]"
          />
        </div>

        {/* Product Details */}
        <div className="grid gap-5">
          <h2 className="text-3xl md:text-2xl font-bold text-lime-800">
            {product.productName}
          </h2>
          <hr className="border border-lime-500 border-dashed" />
          <p className="text-sm md:text-base text-lime-700 leading-relaxed">
            {product.productDescription}
          </p>

          <hr className="border border-lime-500 border-dashed" />
          <p className="text-xs md:text-sm text-lime-600">
            <span className="font-medium">Category:</span>{" "}
            {product.productCategory} |{" "}
            <span className="font-medium">Quantity:</span>{" "}
            {product.productQuantity}
          </p>

          {/* Rating */}
          <div className="flex items-center mt-3">{renderStars(4)}</div>

          {/* Price and Add Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6">
            <span className="text-xl md:text-2xl font-semibold text-lime-900">
              ৳ {product.productPrice}
            </span>
            <button className="w-full sm:w-auto px-5 py-2 rounded-lg bg-lime-500 text-white font-medium transition transform hover:bg-lime-600 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/50">
              Add to Cart
            </button>
          </div>

          {/* Comment Input Section */}
          <div className="mt-6 flex flex-col">
            <textarea
              className="text-gray-800 w-full p-3 border border-lime-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-lime-400 text-sm md:text-base"
              rows={3}
              placeholder="Write a comment..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-3 self-end px-5 py-2 rounded-lg bg-lime-500 text-white font-medium transition transform hover:bg-lime-600 hover:scale-105 hover:shadow-lg hover:shadow-lime-400/50"
            >
              Submit
            </button>
          </div>

          {/* Display Comments */}
          <div className="mt-6 space-y-2">
            {comments.length > 0 ? (
              comments.map((cmt, idx) => (
                <p
                  key={idx}
                  className="text-sm md:text-base text-lime-700 italic border-b border-lime-200 pb-1"
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
    </div>
  );
}

export default Product;
