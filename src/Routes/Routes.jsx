import Root from "../Layout/Root";
import AuthLayout from "../Layout/AuthLayout";
import RegistrationPage from "../Pages/RegistrationPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import { createBrowserRouter } from "react-router";
import DashboardPage from "../Pages/DashboardPage";
import LoginPage from '../Pages/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <DashboardPage />
          </PrivateRoute>
        ),
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          {
            path: "login",
            element: (
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            ),
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: (
      <PublicRoute>
        <RegistrationPage />
      </PublicRoute>
    ),
  },
]);

export default router;