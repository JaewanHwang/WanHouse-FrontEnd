import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, response, error) {
  await api
    .post(`/users/login`, JSON.stringify(user))
    .then(response)
    .catch(error);
}

async function logout(response, error) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.post(`/users/logout`).then(response).catch(error);
}

async function signUp(user, response, error) {
  await api
    .post(`/users/sign-up`, JSON.stringify(user))
    .then(response)
    .catch(error);
}

async function getUserInfoById(userId, response, error) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/users/${userId}`).then(response).catch(error);
}

async function userRegister(user, response, error) {
  await api
    .post(`users/sign-up`, JSON.stringify(user))
    .then(response)
    .catch(error);
}

async function checkDuplUserId(userId, response, error) {
  await api.post(`users/check-id`, userId).then(response).catch(error);
}

async function deleteUserById(userId, response, error) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.post(`users/${userId}`).then(response).catch(error);
}

async function modifyUserById(userId, user, response, error) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.put(`users/${userId}`, user).then(response).catch(error);
}

export {
  login,
  logout,
  signUp,
  getUserInfoById,
  userRegister,
  checkDuplUserId,
  modifyUserById,
  deleteUserById,
};
