import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../component/home"
import Login from "../component/Login";
import MarketMain from "../component/marketmain";
import MarketCard from "../component/marketcard";
import Vlog from "../component/vlogpage";
import Diary from "../component/CropCalculator";

const Mrouter = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
             {
                path: "/product-list",
                element: <MarketMain />
            },
             {
                path: "/product",
                element: <MarketCard />
            },
            {
                path: "/blogs",
                element:<Vlog/>
            },
            {
                path:"/diary", 
                element:<Diary/>

            }

            
            


        ],
        
    },{
    path: "/login",
    element: <Login/>}
]);

export default Mrouter;
