import {
  getAptsAroundCurrentPosition,
  getDetailedAptInfo,
  getSearchedResult,
  postLikeThisApt,
  postUnlikeThisApt,
  getLikedHouses,
} from "@/api/house.js";

const houseStore = {
  namespaced: true,
  state: {
    houses: [],
    house: null,
    dongs: [],
    lat: 37.4705695149055,
    lng: 127.143574460252,
    likedHouses: [],
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
    SET_LIKE: (state, like) => {
      state.house.likeThisApt = like;
    },
    SET_LIKED_HOUSES: (state, likedHouses) => {
      if (likedHouses.length > 0) {
        state.likedHouses = likedHouses;
        state.lat = likedHouses[0].lat;
        state.lng = likedHouses[0].lng;
      }
    },
  },

  actions: {
    FETCH_APTS_AROUND_CURRENT_POSITION: ({ commit }, params) => {
      return getAptsAroundCurrentPosition(params, ({ data }) => {
        commit("SET_HOUSES", data.houseList);
      });
    },
    FETCH_LIKED_HOUSES: ({ commit }) => {
      return getLikedHouses(({ data }) => {
        commit("SET_LIKED_HOUSES", data);
      });
    },
    FETCH_DETAILED_APT_INFO: ({ commit }, aptCode) => {
      return getDetailedAptInfo(aptCode, ({ data }) => {
        commit("SET_HOUSE", data);
      });
    },
    FETCH_SEARCHED_RESULT: ({ commit }, params) => {
      getSearchedResult(params, ({ data }) => {
        commit("SET_HOUSES", data.houseList);
        commit("SET_DONGS", data.dongList);
      });
    },
    POST_LIKE_THIS_APT: ({ commit, state }) => {
      postLikeThisApt(state.house.houseInfo.aptCode, () => {
        commit("SET_LIKE", true);
      });
    },
    POST_UNLIKE_THIS_APT: ({ commit, state }) => {
      postUnlikeThisApt(state.house.houseInfo.aptCode, () => {
        commit("SET_LIKE", false);
      });
    },
  },
};

export default houseStore;
