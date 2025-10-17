import { createBrowserRouter } from "react-router-dom";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Posts from "../pages/Posts";
import Follower from "../pages/Follower";
import Following from "../pages/Following";
import Comments from "../pages/Comments";
import ProfileLayout from "../layouts/ProfileLayout";
import AuthLayout from "../layouts/AuthLayout";
import MainLayout from "../layouts/MainLayout";
import LoadingScreen from "../components/ui/LoadingScreen";
import {
  authCheckPrivate,
  authCheckPublic,
  initialAuthCheck,
} from "../utils/authRedirect";
import MessagesLayout from "../layouts/MessagesLayout";
import Messages from "../pages/Messages";
import { lazy, Suspense } from "react";
import HomeLayout from "../layouts/HomeLayout";
import Follow from "../pages/Follow";
const ChangePassword = lazy(() => import("../pages/ChangePassword"));
const VerifySuccessScreen = lazy(() => import("../pages/VerifySuccessScreen"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const User = lazy(() => import("../pages/Users"));

const route = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    hydrateFallbackElement: <LoadingScreen />,
    children: [
      {
        index: true,
        loader: initialAuthCheck,
      },
      {
        element: <AuthLayout />,
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
          {
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ForgotPassword />
              </Suspense>
            ),
            path: "forgot-password",
          },
          {
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <ChangePassword />
              </Suspense>
            ),
            path: "change-password",
          },
          {
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <VerifySuccessScreen />
              </Suspense>
            ),
            path: "verify-user",
          },
        ],
      },
      {
        element: <MainLayout />,
        loader: authCheckPrivate,
        children: [
          {
            element: <HomeLayout />,
            path: "home",
            children: [
              {
                element: <Home />,
                index: true,
              },
              {
                element: <Follow />,
                path: "follow",
              },
            ],
          },
          {
            element: <Comments />,
            path: "comments/:id",
          },
          {
            element: (
              <Suspense fallback={<LoadingScreen />}>
                <User />
              </Suspense>
            ),
            path: ":username",
            errorElement: <Error userspage />,
          },
          {
            element: <MessagesLayout />,
            path: "/messages",
            children: [
              {
                element: <Messages />,
                path: ":chatId",
              },
            ],
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
                element: <Follower />,
                path: "follower",
              },
              {
                element: <Following />,
                path: "following",
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default route;
