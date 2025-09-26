import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "./Auth";

export const loginLogUpWithEmailAndPassword = async (
  email,
  password,
  isSignUp,
  userName // <-- new parameter
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
      throw error;
    }
  } else {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error("Login error:", error.code, error.message);
      throw error;
    }
  }
};
