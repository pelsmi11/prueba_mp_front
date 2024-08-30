import api from "./config";

export const registerRequest = (user) => api.post("auth/register", user);
export const loginRequest = (user) => api.post("auth/login", user);
export const verifyTokenRequest = (token) => api.post("auth/verify", token);
export const forgtPassword = (email) => api.post("auth/recovery", email);
export const updateUser = (id, data) => {
  console.log({ id, data });
  return api.put(`users/${id}`, data);
};
export const changePasswordRequest = (id, data) => {
  console.log({ id, data });
  return api.post(`auth/change-password`, id);
};
