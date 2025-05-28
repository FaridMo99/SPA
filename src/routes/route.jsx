import { createBrowserRouter, redirect } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Posts from "../pages/Posts";
import Likes from "../pages/Likes";
import Comments from "../pages/Comments";
import useAuth from "../stores/authStore";
import ProfileLayout from "../layouts/ProfileLayout";
import Users from "../pages/Users";

const route = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: () => {
          useAuth.getState().setUser();

          const { authenticated } = useAuth.getState();
          return authenticated ? redirect("/home") : redirect("/login");
        },
      },
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
            element: <Users />,
            path: ":username",
            errorElement: <Error userspage />,
          },
          {
            element: <ProfileLayout />,
            path: "profile",
            children: [
              {
                element: <Posts />,
                index: true,
              },
              {
                element: <Likes />,
                path: "likes",
              },
              {
                element: <Comments />,
                path: "comments",
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default route;

//also add redirect when not coming from "/"
//maybe make dynamic route with a loader and not on component mount
