import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Product from "./components/Products/Product";
import Login from "./components/Login/Login";
import Signup from "./components/SignUp/Signup";
import Shopping from "./components/Cart-shopping/shopping";
import Sales from "./components/Sales/Sales";
import Users from "./components/Users/UsersMa.js";
import ProtectedRoute from "./auth/ProtectedRoute";
import { AuthProvider } from "./auth/AuthProvider";
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <Signup/>,
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children : [
      {
        path : "/dashboard",
        element: <Dashboard />,
      },
      {
        path : "/product",
        element: <Product/>,
      },
      {
        path : "/store",
        element: <Shopping/>,
      },
      {
        path : "/sales",
        element: <Sales/>,
      },
      {
        path : "/usersM",
        element: <Users/>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
