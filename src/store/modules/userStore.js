import { login } from "@/api/user.js";

const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
  },
  getters: {},
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
  },
  actions: {
    async userLogin({ commit }, user) {
      await login(
        user,
        (res) => {
          sessionStorage.setItem("jwt", res.data.token);
          commit("SET_IS_LOGIN", true);
          commit("SET_IS_LOGIN_ERROR", false);
        },
        (error) => {
          console.log("에러", error);
          commit("SET_IS_LOGIN", false);
          commit("SET_IS_LOGIN_ERROR", true);
        },
      );
    },
  },
};

export default userStore;
