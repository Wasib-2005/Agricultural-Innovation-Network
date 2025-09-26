import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./Auth";
import { toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loginLogUpWithEmailAndPassword = async (
  email,
  password,
  isSignUp,
  userName
) => {
  if (isSignUp) {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Set displayName during signup
      if (userName) {
        await updateProfile(user, {
          displayName: userName,
        });
        console.log("DisplayName set to:", userName);
      }

      return user;
    } catch (error) {
      console.error("Signup error:", error.code, error.message);

      // 🔥 Show toast error
      toast.error(
        error.code === "auth/email-already-in-use"
          ? "Email already exists!"
          : "Signup failed. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        }
      );

      throw error;
    }
  } else {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error.code, error.message);

      // 🔥 Show toast error
      let message = "Login failed. Please try again.";
      if (error.code === "auth/wrong-password") {
        message = "Incorrect password!";
      } else if (error.code === "auth/user-not-found") {
        message = "No account found with this email!";
      }

      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

      throw error;
    }
  }
};
