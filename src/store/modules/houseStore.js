import {
  getAptsAroundCurrentPosition,
  getDetailedAptInfo,
  getSearchedResult,
} from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    houses: [],
    house: null,
    dongs: [],
    lat: 37.4705695149055,
    lng: 127.143574460252,
  },

  getters: {
    // positions(state) {
    //   return state.houses.map((house) => {
    //     console.log("getters");
    //     return {
    //       content: `<div style="padding:5px;">${house.aptName}<br><span>상세보기</span></div>`,
    //       latlng: new window.kakao.maps.LatLng(house.lat, house.lng),
    //     };
    //   });
    // },
  },

  mutations: {
    SET_HOUSES: (state, houses) => {
      state.houses = houses;
    },
    SET_HOUSE: (state, house) => {
      state.house = house;
    },
    SET_CURRENT_POSITION: (state, latlng) => {
      state.lat = latlng.getLat();
      state.lng = latlng.getLng();
    },
    SET_DONGS: (state, dongs) => {
      state.dongs = dongs;
    },
  },

  actions: {
    FETCH_APTS_AROUND_CURRENT_POSITION: ({ commit, state }) => {
      return getAptsAroundCurrentPosition(
        { lat: state.lat, lng: state.lng },
        ({ data }) => {
          commit("SET_HOUSES", data.houseList);
        },
      );
    },
    FETCH_DETAILED_APT_INFO: ({ commit }, aptCode) => {
      return getDetailedAptInfo(aptCode, ({ data }) => {
        commit("SET_HOUSE", data);
      });
    },
    FETCH_SEARCHED_RESULT: ({ commit }, keyword) => {
      getSearchedResult(keyword, ({ data }) => {
        commit("SET_HOUSES", data.houseList);
        commit("SET_DONGS", data.dongList);
      });
    },
  },
};

export default houseStore;
