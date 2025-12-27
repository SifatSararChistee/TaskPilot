import Root from "../Layout/Root";
import AuthLayout from "../Layout/AuthLayout";
import RegistrationPage from "../Pages/RegistrationPage";
import PrivateRoute from "./PrivateRoute";
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
            Component: LoginPage,
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    Component: RegistrationPage,
  },
]);

export default router;