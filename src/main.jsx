import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import Mrouter from "./Routers/MRoute.jsx";
import UserContextProvider from "./Contexts/UserContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <Provider store={store}>
        <RouterProvider router={Mrouter} />
      </Provider>
    </UserContextProvider>
  </StrictMode>
);
