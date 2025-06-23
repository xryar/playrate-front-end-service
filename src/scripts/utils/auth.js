import CONFIG from "../config";
import { getActiveRoute } from "../routes/url-parser";

export function getAccessToken() {
  try {
    const accessToken = localStorage.getItem(CONFIG.ACCESS_TOKEN);

    if (accessToken == null || accessToken === "undefined") {
      return null;
    }

    return accessToken;
  } catch (error) {
    console.error("Get Access Token Error: ", error);
    return null;
  }
}

export function putAccessToken(accessToken) {
  try {
    localStorage.setItem(CONFIG.ACCESS_TOKEN, accessToken);
    return true
  } catch (error) {
    console.log("Put Access Token Error: ", error);
    return false;
  }
}

export function getRefreshToken() {
  try {
    const refreshToken = localStorage.getItem(CONFIG.REFRESH_TOKEN);

    if (refreshToken == null || refreshToken === "undefined") {
      return null;
    }
    return refreshToken;
  } catch (error) {
    console.error("Get Refresh Token Error: ", error);
    return null;
  }
}

export function removeAccessToken() {
  try {
    localStorage.removeItem(CONFIG.ACCESS_TOKEN);
    return true;
  } catch (error) {
    console.error("Remove Access Token Error: ", error);
    return false;
  }
}

const unauthenticatedRoutesOnly = ["/login", "/register"];

export function checkUnauthenticatedRouteOnly(page) {
  const url = getActiveRoute();
  const isLogin = !!getAccessToken();

  if (unauthenticatedRoutesOnly.includes(url) && isLogin) {
    location.hash = "/";
    return null;
  }

  return page;
}

export function checkAuthenticatedRoute(page) {
  const isLogin = !!getAccessToken();

  if (!isLogin) {
    location.hash = "/login";
    return null;
  }

  return page;
}

export function getLogout() {
  removeAccessToken();
}
