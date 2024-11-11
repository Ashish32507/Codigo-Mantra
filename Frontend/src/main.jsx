import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Component/Login.jsx";
import Signup from "./Component/Signup.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainCard from "./Component/MainCard.jsx";
import DetailPage from "./Component/DetailPage.jsx";
import { Provider } from "react-redux";
import store from "./redux/Store.js";
import UserPost from "./Component/UserPost.jsx";
import NewPost from "./Component/NewPost.jsx";

// Define your routes
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainCard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/details/:id",
        element: <DetailPage />,
      },
      {
        path: "/userpost",
        element: <UserPost />,
      },
      {
        path: "/newpost",
        element: <NewPost />,
      },
    ],
  },
]);

// Render the app with the store and router
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={routes} />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
