import LoginPage from "../../pages/auth/login-page";
import RegisterPage from "../../pages/auth/register-page";
import HomePage from "@/pages/app/home-page";

import { AUTH_ROUTES, PROTECTED_ROUTES } from "./route-paths";

export const authenticationRoutePaths = [
  { path: AUTH_ROUTES.LOGIN, element: <LoginPage /> },
  { path: AUTH_ROUTES.REGISTER, element: <RegisterPage /> },
];

export const protectedRoutePaths = [
  { path: PROTECTED_ROUTES.DASHBOARD, element: <HomePage /> },
];
