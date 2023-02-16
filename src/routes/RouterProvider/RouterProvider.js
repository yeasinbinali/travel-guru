import { createBrowserRouter } from "react-router-dom";
import Booking from "../../components/Booking/Booking";
import Destination from "../../components/Destination/Destination";
import Home from "../../components/Home/Home";
import Login from "../../components/Login/Login";
import Register from "../../components/Register/Register";
import TermsAndConditions from "../../components/TermsAndConditions/TermsAndConditions";
import Main from "../../layout/Main/Main";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
        loader: async () => {
          return fetch(
            "https://travel-guru-server-sand.vercel.app/destination"
          );
        },
      },
      {
        path: "/destination/:id",
        element: (
          <PrivateRoute>
            <Destination></Destination>
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          return fetch(
            `https://travel-guru-server-sand.vercel.app/destination/${params.id}`
          );
        },
      },
      {
        path: "/terms",
        element: <TermsAndConditions></TermsAndConditions>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/booking",
        element: <Booking></Booking>,
      },
    ],
  },
]);
