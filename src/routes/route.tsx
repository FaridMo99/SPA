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
import Users from "../pages/Users";
import LoadingScreen from "../components/ui/LoadingScreen";
import {
  authCheckPrivate,
  authCheckPublic,
  initialAuthCheck,
} from "../utils/authRedirect";
import MessagesLayout from "../layouts/MessagesLayout";
import Messages from "../pages/Messages";
import ForgotPassword from "../pages/ForgotPassword";
import VerifySuccessScreen from "../pages/VerifySuccessScreen";
import ChangePassword from "../pages/ChangePassword";

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
            element: <ForgotPassword />,
            path: "forgot-password",
          },
          {
            element: <ChangePassword />,
            path: "change-password",
          },
          {
            element: <VerifySuccessScreen />,
            path: "verify-user",
          },
          {
            element: <ChangePassword />,
            path: "change-password-edit",
          },
        ],
      },
      {
        element: <MainLayout />,
        loader: authCheckPrivate,
        children: [
          {
            element: <Home />,
            path: "home",
          },
          {
            element: <Comments />,
            path: "comments/:id",
          },
          {
            element: <Users />,
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
