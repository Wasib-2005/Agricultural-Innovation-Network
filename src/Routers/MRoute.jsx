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
      {
        path: "/diary",
        element: <Diary />,
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
]);

export default Mrouter;
