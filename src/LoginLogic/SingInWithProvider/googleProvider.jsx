import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../Auth";

export const googleProvider = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    console.log("Google sign-in successful:", result.user);
    // Google Access Token
  } catch (error) {
    console.error("Google sign-in error:", error);
  }
};
