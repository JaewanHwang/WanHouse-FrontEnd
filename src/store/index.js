import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

import houseStore from "@/store/modules/houseStore.js";
import userStore from "@/store/modules/userStore.js";

export default new Vuex.Store({
  modules: {
    houseStore,
    userStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
