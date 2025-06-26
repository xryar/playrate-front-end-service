import {
  checkAuthenticatedRoute,
  checkUnauthenticatedRouteOnly,
} from "../utils/auth";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import HomePage from "../pages/home/home-page";
import DetailPage from "../pages/detail/detail-page";
import AddPage from "../pages/add/add-page";
import MyReviewPage from "../pages/my-review/my-review-page";

const routes = {
  "/login": () => checkUnauthenticatedRouteOnly(new LoginPage()),
  "/register": () => checkUnauthenticatedRouteOnly(new RegisterPage()),

  "/": () => checkAuthenticatedRoute(new HomePage()),
  "/new": () => checkAuthenticatedRoute(new AddPage()),
  "/reviews/:id": () => checkAuthenticatedRoute(new DetailPage()),
  "/my-reviews": () => checkAuthenticatedRoute(new MyReviewPage())
};

export default routes;
