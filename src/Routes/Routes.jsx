import { createBrowserRouter } from "react-router";
import Root from "../assets/Layout/Root";
import LoginPage from '../Pages/LoginPage';
import DashboardPage from '../Pages/DashboardPage';
import RegistrationPage from "../Pages/RegistrationPage";
import AuthLayout from "../assets/Layout/AuthLayout";


const router = createBrowserRouter([
{
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: DashboardPage },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: LoginPage },
        ],
      },
    ],
  },
    {
    path: "/register",
    Component: RegistrationPage,
  }
]);
export default router;