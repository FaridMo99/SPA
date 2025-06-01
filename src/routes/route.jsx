import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Posts from "../pages/Posts";
import Likes from "../pages/Likes";
import Comments from "../pages/Comments";
import ProfileLayout from "../layouts/ProfileLayout";
import Users from "../pages/Users";
import LoadingScreen from "../components/LoadingScreen";
import {
  authCheckPrivate,
  authCheckPublic,
  initialAuthCheck,
} from "../utils/authRedirect";

const route = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        //  loader: initialAuthCheck,
      },
      {
        element: <AuthLayout />,
        // loader: authCheckPublic,
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
        // loader: authCheckPrivate,
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

//put both layouts in suspense boundary and send depending on where you are
//add loading screen when entering while it checks for auth and after login
//for the loading state of sending login

//maybe make dynamic route with a loader and not on component mount
//make this in the beginning question accept all cookies?
