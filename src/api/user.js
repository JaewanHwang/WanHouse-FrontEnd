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

async function findById(userId, response, error) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/users/${userId}`).then(response).catch(error);
}

export { login, logout, signUp, findById };
