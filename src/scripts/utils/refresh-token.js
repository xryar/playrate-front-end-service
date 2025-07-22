import {getRefreshToken} from "./auth";
import CONFIG from "../config";

export async function refreshAccessToken() {
    const refreshToken = getRefreshToken();

    if (!refreshToken) {
        return { ok: false, message: "Tidak ada refresh token" };
    }

    const response = await fetch(`${CONFIG.BASE_URL}/login`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken })
    });
    const json = await response.json();

    if (response.ok && json.data?.accessToken) {
        localStorage.setItem("accessToken", json.data.accessToken);
    }

    return {
        ...json,
        ok: response.ok,
    }
}

export async function withTokenRetry(apiFunc) {
    let result = await apiFunc();

    const unauthorized = result.statusCode === 401 || result.message?.toLowerCase().includes("unauthorized");

    if (!result.ok && unauthorized) {
        const refresh = await refreshAccessToken();

        if (refresh.ok) {
            result = await apiFunc();
        } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            window.location.href = "/login";
        }
    }

    return result;
}
