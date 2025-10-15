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
