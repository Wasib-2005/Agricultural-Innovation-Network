import { createBrowserRouter } from "react-router";
import App from "../App";

import Login from "../Pages/Login";
// import Vlog from "../Components/vlogpage";
import Diary from "../Components/CropCalculator";
import Home from "../Pages/Home";
import MarketPlace from "../Pages/MarketPlace";
import Product from "../Components/MarketComponents/Product";
import UserContextProvider from "../Contexts/UserContextProvider";
import ProfileForm from "../Pages/ProfileForm";
import Checkout from "../Pages/Checkout";
import BlogPage from "../Pages/BlogPage";
import Profile from "../Pages/Profile";
import Dashboard from "../Pages/Dashboard";
import AddGoods from "../Pages/AddGoods";
import OurTeam from "../Pages/OurTeam";

const Mrouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/product-list",
        element: <MarketPlace />,
      },
      {
        path: "/product",
        element: <Product />,
      },
      {
        path: "/product/:productID",
        element: <Product />,
      },
      { path: "/blogs", element: <BlogPage /> },
      { path: "/checkout", element: <Checkout /> },
      {
        path: "/calculator",
        element: <Diary />,
      },
      { path: "/profile", element: <Profile /> },
      { path: "/add", element: <AddGoods /> },
      {
        path: "/dashboad",
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create_user_form",
    element: <ProfileForm />,
  },
  {
    path: "/our_team",
    element: <OurTeam />,
  },
]);

export default Mrouter;
