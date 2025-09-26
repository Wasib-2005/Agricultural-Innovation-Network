import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./Auth";

export const loginLogUpWithEmailAndPassword = async (
  email,
  password,
  isSignUp
) => {
  if (isSignUp) {
    return createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed up:", userCredential.user);
        return userCredential.user;
      })
      .catch((error) => {
        console.error("Signup error:", error.code, error.message);
        throw error;
      });
  } else {
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("Signed in:", userCredential.user);
        return userCredential.user;
      })
      .catch((error) => {
        console.error("Login error:", error.code, error.message);
        throw error;
      });
  }
};
