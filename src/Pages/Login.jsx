import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { loginLogUpWithEmailAndPassword } from "../LoginLogic/emalAndPass";
import { googleProvider } from "../LoginLogic/SingInWithProvider/googleProvider";
import { verifyUserInMongo } from "../LoginLogic/verifyUserInMongo";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { userData } = useContext(UserContext);

  const [isSignUp, setIsSignUp] = useState(false);
  const [isShowingPassword, setIsShowingPassword] = useState(false);
  const [userName, setUserName] = useState(userData?.displayName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkUser = async () => {
      if (!userData?.email) return;
      const exists = await verifyUserInMongo(userData.email);
      if (!exists) {
        navigate("/create_user_form");
      }
      else{
        navigate("/")
      }
    };
    checkUser();
  }, [userData?.email]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.log("Email and password are required");
      return;
    }

    try {
      const user = await loginLogUpWithEmailAndPassword(
        email,
        password,
        isSignUp,
        userName
      );
      if (user?.user?.email) {
        const exists = await verifyUserInMongo(user.user.email);
        if (!exists) navigate("/create_user_form");
      }
    } catch (error) {
      console.error("Authentication error:", error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const user = await googleProvider(isSignUp);
      if (user?.user?.email) {
        const exists = await verifyUserInMongo(user.user.email);
        if (!exists) navigate("/create_user_form");
      }
    } catch (error) {
      console.error("Google sign-in error:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 to-lime-300 p-2">
      <form onSubmit={handleFormSubmit} className="w-full max-w-md mx-auto">
        <motion.div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl grid gap-4">
          <motion.div className="flex flex-col items-center gap-2 text-center">
            <motion.img
              src="/ain-logo-01.png"
              width={50}
              alt="logo"
              whileHover={{ rotate: 10, scale: 1.1 }}
            />
            <h2 className="text-2xl font-bold text-gray-800">
              {isSignUp ? "Create Account" : "Login to Your Account"}
            </h2>
          </motion.div>

          {isSignUp ? (
            <motion.input
              type="text"
              name="userName"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full bg-gray-100 p-3 rounded-lg text-gray-800"
            />
          ) : (
            <></>
          )}
          <motion.input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-gray-100 p-3 rounded-lg text-gray-800"
          />

          <motion.div className="relative w-full">
            <input
              type={isShowingPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-100 p-3 rounded-lg pr-10 text-gray-800"
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setIsShowingPassword(!isShowingPassword)}
            >
              {isShowingPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </span>
          </motion.div>

          <motion.p className="text-gray-600 text-center text-sm">
            {isSignUp ? "Already have an account?" : "Don’t have an account?"}
            <span
              onClick={() => setIsSignUp(!isSignUp)}
              className="ml-2 text-lime-700 font-bold cursor-pointer"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </span>
          </motion.p>

          <motion.button
            type="submit"
            className="w-full py-3 rounded-lg bg-lime-700 text-white font-bold"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </motion.button>

          <p className="text-gray-900 text-center text-sm">or</p>

          <motion.div
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center gap-2 w-full bg-white border p-2 rounded-lg cursor-pointer"
          >
            <FcGoogle size={20} />
            <span className="text-black">Sign in with Google</span>
          </motion.div>
        </motion.div>
      </form>
    </div>
  );
};

export default Login;
