import jwtDecode from "jwt-decode";
import http from "./httpService";

const authEndpoint = "/auth";

const tokenKey = "token";
const tourKey = "tour";

http.setJwt(localStorage.getItem(tokenKey));

async function login(email, password) {
  const { data: jwt } = await http.post(authEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
  window.location = "/";
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

function openTour() {
  const tourSeen = localStorage.getItem(tourKey);

  if (tourSeen) return false;

  localStorage.setItem(tourKey, JSON.stringify({ seen: true }));
  return true;
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  openTour,
};
