import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from "react-router-dom";
import Login from "../screens/auth/login";
import Register from "../screens/auth/register";
import Dashboard from "../screens/dashboard";
import Payment from "../screens/payment";

let router
router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
    {
        path: "/make-payment",
        element: <Payment />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);



export default router; 