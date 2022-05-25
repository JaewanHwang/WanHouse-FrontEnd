import { apiInstance } from "./index.js";

const api = apiInstance();

async function login(user, res, error) {
  await api.post(`/users/login`, JSON.stringify(user)).then(res).catch(error);
}

async function signUp(user, res, error) {
  await api.post(`/users/sign-up`, JSON.stringify(user)).then(res).catch(error);
}

export { login, signUp };
