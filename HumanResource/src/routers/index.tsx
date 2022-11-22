import { BrowserRouter as Router, Route, Routes, createBrowserRouter } from "react-router-dom";
import Login from "../screens/auth/login";
import Dashboard from "../screens/dashboard";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
]);


export default router; 