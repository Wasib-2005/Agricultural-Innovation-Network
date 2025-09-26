import { Outlet, useNavigate } from "react-router";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import { useContext, useEffect } from "react";
import { UserContext } from "./Contexts/UserContext";
import { verifyUserInMongo } from "./LoginLogic/verifyUserInMongo";

const App = () => {
  const { userData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.email) {
      verifyUserInMongo(userData.email).then((exists) => {
        console.log("User exists:", exists);
        if (!exists) navigate("/create_user_form");
      });
    }
  }, [userData]);

  return (
    <div className="bg-gradient-to-br from-lime-100 to-lime-300 w-full min-h-screen ">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
