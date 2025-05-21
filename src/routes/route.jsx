import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Error from "../pages/Error";
import Home from "../pages/Home";

const route = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <Error />,
    path: "/",
    children: [
      {
        element: <Home />,
        index: true,
      },
    ],
  },
]);

export default route;
