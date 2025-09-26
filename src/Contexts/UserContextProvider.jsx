import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../LoginLogic/Auth";

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserData(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{  userData,  setUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
