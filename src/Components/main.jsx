import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginLogUpWithEmailAndPassword } from "../LoginLogic/emalAndPass";
import { googleProvider } from "../LoginLogic/SingInWithProvider/googleProvider";


const Login = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } },
    exit: { opacity: 0, scale: 0.9, y: -50 },
  };

  const inputVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  const [isSignUp, setIsSignUp] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!data.email || !data.password) {
      console.log("Email and password are required");
      return;
    }

    try {
      const user = await loginLogUpWithEmailAndPassword(
        data.email,
        data.password,
        isSignUp
      );
      console.log("User authenticated:", user);
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 to-lime-300">
      <form onSubmit={handleFormSubmit}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="bg-white/90 backdrop-blur-sm p-10 rounded-2xl shadow-2xl grid gap-5 w-[350px] md:w-auto"
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center gap-3"
          >
            <motion.img
              src="./public/ain-logo-01.png"
              width={50}
              alt="logo"
              whileHover={{ rotate: 10, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
            />
            <h2 className="text-2xl font-bold text-gray-800 drop-shadow-md">
              {isSignUp ? "Create Account" : "Login to Your Account"}
            </h2>
          </motion.div>

          {/* Form Fields */}
          <AnimatePresence mode="wait">
            {isSignUp && (
              <>
                <motion.input
                  key="username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="input bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-700 px-3 py-2 rounded-lg outline-none shadow-sm"
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                />
                <motion.div className="flex items-center gap-3">
                  <p className="text-gray-400 w-20 pl-2">I am a </p>

                  <select
                    defaultValue="se"
                    className="select bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-500 px-3 py-2 rounded-lg outline-none shadow-sm"
                  >
                    <option value="se" disabled={true}>
                      Select One
                    </option>
                    <option value={"farmer"} className=" text-gray-500">
                      Farmer
                    </option>
                    <option className=" text-gray-500">Officer</option>
                    <option className=" text-gray-500">Consumer</option>
                  </select>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            className="input bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-700 px-3 py-2 rounded-lg outline-none shadow-sm"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          />

          {/* Password Field with Toggle */}
          <motion.div
            className="relative"
            variants={inputVariants}
            initial="hidden"
            animate="visible"
          >
            <input
              type={isShowingPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full bg-gray-100 focus:bg-white focus:ring-2 focus:ring-lime-400 text-gray-700 px-3 py-2 rounded-lg outline-none shadow-sm pr-10"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
              onClick={() => setIsShowingPassword(!isShowingPassword)}
            >
              {isShowingPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </motion.div>

          {/* Switch Mode */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-600 text-center"
          >
            {isSignUp ? "Already have an account?" : "Don’t have an account?"}
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-lime-700 font-bold hover:text-gray-900 hover:underline cursor-pointer transition-colors"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </motion.p>

          {/* Buttons */}
          <motion.button
            whileHover={{ scale: 1.08, backgroundColor: "#6B8E23" }}
            whileTap={{ scale: 0.95 }}
            className="btn bg-[#556B2F] border-none text-white font-bold px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </motion.button>

          <p className="text-gray-900 text-center">or,</p>

          {/* Google Login */}
          <motion.div onClick={() => googleProvider()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition cursor-pointer"
          >
            <FcGoogle />
            Sign in with Google
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
};

export default Login;
