// import { getAptsAroundCurrentPositiont } from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    houses: [],
    house: null,
    lat: 37.5139848,
    lng: 127.0565207,
  },

  getters: {},

  mutations: {},

  actions: {
    // FETCH_APTS_AROUND_CURRENT_POSITION: ({ commit }, params) => {
    //   getAptsAroundCurrentPositiont(params, ({ data }) => {
    //     commit("SET_HOUSE_LIST");
    //   });
    // },
  },
};

export default houseStore;
