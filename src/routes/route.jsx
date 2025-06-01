import { createBrowserRouter } from "react-router-dom";
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
import { Suspense, lazy } from "react";

const LazyAuthLayout = lazy(() => import("../layouts/AuthLayout"));
const LazyMainLayout = lazy(() => import("../layouts/MainLayout"));

const route = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: initialAuthCheck,
      },
      {
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LazyAuthLayout />
          </Suspense>
        ),
        loader: authCheckPublic,
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
        element: (
          <Suspense fallback={<LoadingScreen />}>
            <LazyMainLayout />
          </Suspense>
        ),
        loader: authCheckPrivate,
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

//make this in the beginning question accept all cookies?
