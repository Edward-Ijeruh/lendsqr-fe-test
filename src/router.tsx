import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login/Login";
import Users from "./pages/Users/Users";
import UserDetails from "./pages/UserDetails/UserDetails";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import PageWrapper from "./components/layout/PageWrapper/PageWrapper";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <PageWrapper>
          <Users />
        </PageWrapper>
      </ProtectedRoute>
    ),
  },
  {
    path: "/user-details/:id",
    element: (
      <ProtectedRoute>
        <PageWrapper>
          <UserDetails />
        </PageWrapper>
      </ProtectedRoute>
    ),
  },
]);
