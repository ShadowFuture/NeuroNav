const AUTH_STORAGE_KEY = "neuronav-auth";
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ----------------------
// Local Storage Helpers
// ----------------------
const readStoredAuth = () => {
  try {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const saveAuth = (authPayload) => {
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authPayload));
};

export const clearAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const getStoredAuth = () => readStoredAuth();
export const getAuthToken = () => readStoredAuth()?.token || null;
export const isAuthenticated = () => Boolean(getAuthToken());

export const getAuthHeaders = () => {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ----------------------
// Core Request Handler
// ----------------------
const requestJson = async (path, payload, expectToken = false) => {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => null);
  console.log("BACKEND RAW RESPONSE:", data);

  if (!response.ok) {
    throw new Error(data?.detail || data?.message || "Authentication request failed.");
  }

  // Only login should expect a token
  if (expectToken) {
    const token =
      data?.access_token ||
      data?.token ||
      data?.jwt ||
      null;

    if (!token) {
      throw new Error("The authentication service did not return a token.");
    }

    saveAuth({
      token,
      user: data?.user || null,
    });
  }

  return data;
};

// ----------------------
// Public API
// ----------------------
export const loginUser = (email, password) =>
  requestJson("/auth/login", { email, password }, true);

export const signupUser = (email, password) =>
  requestJson("/auth/signup", { email, password }, false);
