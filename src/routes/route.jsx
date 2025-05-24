import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import SignUp from "../pages/SignUp";
import useAuth from "../stores/authStore";

const route = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      const { authenticated } = useAuth.getState();

      return authenticated ? redirect("/home") : redirect("/login");
    },
    errorElement: <Error />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            element: <Login />,
            path: "login",
          },
          {
            element: <SignUp />,
            path: "signup",
          },
        ],
      },
      {
        element: <MainLayout />,
        children: [
          {
            element: <Home />,
            path: "home",
          },
          {
            element: <Profile />,
            path: "profile",
          },
        ],
      },
    ],
  },
]);

export default route;
