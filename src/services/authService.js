import jwtDecode from "jwt-decode";
import http from "./httpService";

const authEndpoint = "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

function getJwt() {
  return localStorage.getItem(tokenKey);
}

async function login(email, password) {
  const { data: jwt } = await http.post(authEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

function logout() {
  localStorage.removeItem(tokenKey);
}

function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
