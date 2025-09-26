import { signOut } from "firebase/auth";
import { auth } from "./Auth";


export const longOut = () => {
  
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};
