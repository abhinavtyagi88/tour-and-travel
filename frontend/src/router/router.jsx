import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./screenPages/Home";
import Profile from "./screenPages/Profile";
import NotFound from "./screenPages/NotFound";
import Location from "./screenPages/Location";
import Signup from "./screenPages/Signup";
import Login from "./screenPages/Login";
import Layout from "../../layout/Layout";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <NotFound />,
      children: [
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/locations",
          element: <Location />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router}>
        <Layout />
      </RouterProvider>
    </div>
  );
};

export default Router;
