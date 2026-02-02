import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/UserDetails/UserDetails";

export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "dashboard", element: <Dashboard /> },
  { path: "users", element: <Users /> },
  { path: "userDetails/:id", element: <UserDetails /> },
]);
