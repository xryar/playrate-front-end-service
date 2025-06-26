import CONFIG from "../config";
import {getAccessToken, getRefreshToken} from "../utils/auth";

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/users`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  LOGOUT: `${CONFIG.BASE_URL}/logout`,
  ADD_REVIEW: `${CONFIG.BASE_URL}/reviews`,
  GET_REVIEWS: `${CONFIG.BASE_URL}/reviews`,
  DETAIL_REVIEW: (id) => `${CONFIG.BASE_URL}/reviews/${id}`,
  GET_MY_REVIEWS: `${CONFIG.BASE_URL}/reviews/my-reviews`,
  DELETE_REVIEW: (id) => `${CONFIG.BASE_URL}/reviews/${id}`,
};

export async function Register({ fullname, username, password }) {
  const data = JSON.stringify({ fullname, username, password });

  const response = await fetch(ENDPOINTS.REGISTER, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

export async function Login({ username, password }) {
  const data = JSON.stringify({ username, password });

  const response = await fetch(ENDPOINTS.LOGIN, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: data,
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

export async function getAllReviews() {
  const accessToken = getAccessToken();

  const response = await fetch(ENDPOINTS.GET_REVIEWS, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  const json = await response.json();
  return {
    ...json,
    ok: response.ok,
  };
}

export async function getReviewById(id) {
  const accessToken = getAccessToken();
  const response = await fetch(ENDPOINTS.DETAIL_REVIEW(id), {
    method: "GET",
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

export async function addReview({ title, description, cover }) {
  const accessToken = getAccessToken();

  const formData = new FormData();
  formData.append("cover", cover);
  formData.set("title", title);
  formData.set("description", description);

  const response = await fetch(ENDPOINTS.ADD_REVIEW, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

export async function deleteReview(id) {
  const accessToken = getAccessToken();
  const response = await fetch(ENDPOINTS.DELETE_REVIEW(id), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

export async function getMyReviews() {
  const accessToken = getAccessToken();
  const response = await fetch(ENDPOINTS.GET_MY_REVIEWS, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await response.json();

  return {
    ...json,
    ok: response.ok,
  };
}

export async function Logout() {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    console.warn("No refresh token found.");
    return { ok: false, message: "Tidak ada refresh token" };
  }

  const response = await fetch(`${CONFIG.BASE_URL}/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  const json = await response.json();
  return { ...json, ok: response.ok };
}
