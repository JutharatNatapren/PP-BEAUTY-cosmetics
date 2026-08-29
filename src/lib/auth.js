const TOKEN_KEY = "token";
const USER_KEY = "user";
const CURRENT_USER_KEY = "currentUser";

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function saveToken(token) {
  if (typeof window === "undefined" || !token) return false;
  localStorage.setItem(TOKEN_KEY, String(token));
  localStorage.removeItem("access_token");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("jwt");
  return true;
}

export function clearToken() {
  if (typeof window === "undefined") return;
  [TOKEN_KEY, "access_token", "accessToken", "jwt"].forEach((key) => {
    localStorage.removeItem(key);
  });
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(CURRENT_USER_KEY);
  localStorage.removeItem("username");
}

export function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveUser(user) {
  if (typeof window === "undefined" || !user) return false;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
  if (user.username) localStorage.setItem("username", String(user.username));
  return true;
}

export function authHeaders(token = getToken()) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function extractToken(data) {
  return (
    data?.token ||
    data?.access_token ||
    data?.accessToken ||
    data?.jwt ||
    data?.data?.token ||
    data?.data?.access_token ||
    data?.data?.accessToken ||
    data?.data?.jwt ||
    data?.user?.token ||
    data?.user?.access_token ||
    null
  );
}

export function extractUser(data, fallbackUsername = "") {
  const candidates = [
    data?.user,
    data?.data?.user,
    data?.profile,
    data?.data?.profile,
    data?.data,
    data,
  ];

  const source = candidates.find(
    (item) =>
      item &&
      typeof item === "object" &&
      (item.firstname ||
        item.firstName ||
        item.lastname ||
        item.lastName ||
        item.username ||
        item.name ||
        item.role ||
        item.permission)
  ) || {};

  const firstname = source.firstname ?? source.firstName ?? "";
  const lastname = source.lastname ?? source.lastName ?? "";
  const username = source.username ?? fallbackUsername ?? "";
  const name =
    source.name ||
    [firstname, lastname].filter(Boolean).join(" ").trim() ||
    username;

  return {
    ...source,
    firstname,
    lastname,
    username,
    name,
  };
}

export function apiMessage(data, fallback = "") {
  return (
    data?.message ||
    data?.error ||
    data?.detail ||
    data?.msg ||
    fallback
  );
}

// The API currently exposed by the server has shown more than one historical
// login route. We try the documented candidates in a safe order and only move
// to the next route when the current route is missing/not supported.
export const LOGIN_ENDPOINTS = [
  "https://api.itdev.cmtc.ac.th/auth/login",
  "https://api.itdev.cmtc.ac.th/login",
  "https://api.itdev.cmtc.ac.th/users/login",
];
