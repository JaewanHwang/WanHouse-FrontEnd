import { getUserInfoById, login } from "@/api/user.js";

const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
  },
  getters: {
    getterUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
  },
  actions: {
    async userLogin({ commit }, user) {
      await login(
        user,
        (res) => {
          commit("SET_IS_LOGIN", true);
          commit("SET_IS_LOGIN_ERROR", false);
          sessionStorage.setItem("access-token", res.data.token);
        },
        () => {
          commit("SET_IS_LOGIN", false);
          commit("SET_IS_LOGIN_ERROR", true);
        },
      );
    },
    getUserInfo({ commit }, userId) {
      getUserInfoById(
        userId,
        (response) => {
          commit("SET_USER_INFO", response.data);
          console.log(response);
        },
        (error) => {
          console.log(error);
        },
      );
    },
  },
};

export default userStore;
