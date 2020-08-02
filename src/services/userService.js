import http from "./httpService";

const usersEndpoint = "/users";

const forgotPasswordEndpoint = "/forgotPassword";
const requestResetTokenEndpoint = forgotPasswordEndpoint + "/request";
const validateTokenEndpoint = forgotPasswordEndpoint + "/validate";
const resetPasswordEndpoint = forgotPasswordEndpoint + "/reset";

function register(user) {
  return http.post(usersEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
  });
}

function requestResetToken(email) {
  return http.post(requestResetTokenEndpoint, { email });
}

function validateToken(email, token) {
  return http.post(validateTokenEndpoint, { email, token });
}

function resetPassword(email, token, newPassword) {
  return http.put(resetPasswordEndpoint, { email, token, newPassword });
}

export default {
  register,
  requestResetToken,
  validateToken,
  resetPassword,
};
