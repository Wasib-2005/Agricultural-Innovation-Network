import { useState } from "react";
import axios from "axios";
import { Slide, toast } from "react-toastify";

const AddGoods = () => {
  const [formData, setFormData] = useState({
    productName: "",
    productCategory: "",
    productQuantity: "",
    productPrice: "",
    productImg: null,
    productDescription: "",
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB");
      return;
    }
    setFormData({ ...formData, productImg: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const uploadData = new FormData();
      uploadData.append("email", "asdfasdf@asd.com"); // ✅ add email here
      uploadData.append("productName", formData.productName);
      uploadData.append("productCategory", formData.productCategory);
      uploadData.append("productQuantity", formData.productQuantity);
      uploadData.append("productPrice", formData.productPrice);
      uploadData.append("productDescription", formData.productDescription);
      if (formData.productImg) {
        uploadData.append("productImg", formData.productImg);
      }

      let lastProgress = 0;

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/upload/products`,
        uploadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 90) / progressEvent.total
            );

            // Smooth animation
            if (percentCompleted > lastProgress) {

              let step = lastProgress;

              const interval = setInterval(() => {
                step++;
                setUploadProgress(step);

                if (step >= percentCompleted) {
                  lastProgress = percentCompleted;
                  clearInterval(interval);
                }
              }, 10);
            }
          },
        }
      );

      console.log("✅ Product uploaded:", res.data);
      setUploadProgress(100);
      toast.success("Upload successfully!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Slide,
      });

      setFormData({
        productName: "",
        productCategory: "",
        productQuantity: "",
        productPrice: "",
        productImg: null,
        productDescription: "",
      });
    } catch (err) {
      console.error("❌ Upload error:", err);
      toast.error("Upload failed!", {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
        transition: Slide,
      });
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 500);
    }
  };

  return (
    <div className="w-full h-[90vh] flex justify-center items-center text-black">
      <form
        onSubmit={handleSubmit}
        className="text-center bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl grid gap-5 w-[94%] md:w-[500px]"
      >
        <h1 className="text-black font-bold text-2xl md:text-3xl">
          Goods Information
        </h1>

        <input
          type="text"
          name="productName"
          value={formData.productName}
          onChange={handleChange}
          placeholder="Product Name"
          className="bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-700 px-3 py-2 rounded-lg outline-none shadow-sm w-full"
          required
        />

        <input
          type="text"
          name="productCategory"
          value={formData.productCategory}
          onChange={handleChange}
          placeholder="Product Category"
          className="bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-700 px-3 py-2 rounded-lg outline-none shadow-sm w-full"
          required
        />

        <div className="flex gap-3">
          <input
            type="number"
            name="productQuantity"
            value={formData.productQuantity}
            onChange={handleChange}
            placeholder="Quantity (e.g. 10 kg)"
            className="bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-700 px-3 py-2 rounded-lg outline-none shadow-sm w-full"
            required
          />
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            placeholder="Price (৳)"
            className="bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-700 px-3 py-2 rounded-lg outline-none shadow-sm w-full"
            required
          />
        </div>

        <fieldset>
          <input
            className="file-input bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-700 rounded-lg outline-none shadow-sm w-full"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </fieldset>

        {formData.productImg && (
          <div className="mt-3">
            <img
              src={URL.createObjectURL(formData.productImg)}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg mx-auto"
            />
          </div>
        )}

        <textarea
          name="productDescription"
          value={formData.productDescription}
          onChange={handleChange}
          placeholder="Product Description"
          rows="3"
          className="bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-700 px-3 py-2 rounded-lg outline-none shadow-sm w-full"
        ></textarea>

        <button
          type="submit"
          className="bg-lime-500 hover:bg-lime-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition-all"
          disabled={isUploading}
        >
          {isUploading ? `${uploadProgress}%` : "Submit Product"}
        </button>
      </form>
    </div>
  );
};

export default AddGoods;
