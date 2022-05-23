import Vue from "vue";
import Vuex from "vuex";
import houseStore from "@/store/modules/houseStore.js";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    houseStore,
  },
  plugins: [
    createPersistedState({
      storage: sessionStorage,
    }),
  ],
});
