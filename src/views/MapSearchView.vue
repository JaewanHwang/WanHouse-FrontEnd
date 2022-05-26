<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div id="search-container">
      <v-toolbar floating elevation="5">
        <v-text-field
          hide-details
          prepend-icon="mdi-magnify"
          label="법정동 또는 아파트"
          clearable
          @keydown.enter="searchByKeyword"
          v-model="keyword"
        ></v-text-field>
        <v-btn icon @click="openFilters">
          <v-icon>mdi-tune</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card
        class="mx-auto searched-result"
        tile
        v-if="isSearched"
        width="300"
        v-click-outside="closeSearchedResult"
        elevation="10"
      >
        <v-list class="overflow-y-auto" max-height="20rem" dense>
          <v-list-item-group v-model="selectedDong" color="primary">
            <v-subheader><strong>지역</strong></v-subheader>
            <v-list-item
              v-for="item in dongs"
              :key="item.dongCode"
              :value="item.dongCode"
            >
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{
                  item.fullName
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
          <v-list-item-group v-model="selectedApt" color="primary">
            <v-subheader><strong>아파트</strong></v-subheader>
            <v-list-item
              v-for="item in houses"
              :key="item.aptCode"
              :value="item.aptCode"
            >
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">{{
                  item.aptName
                }}</v-list-item-title>
                <v-list-item-subtitle>{{
                  [item.sidoName, item.gugunName, item.dongName].join(" ")
                }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </div>
    <v-card elevation="5" v-click-outside="closeFilters" v-if="showFilters">
      <div class="filter_container">
        <div class="d-flex justify-space-between filter_header">
          <div class="text-h7 font-weight-bold">매매가</div>
          <div class="subheading font-weight-light mr-1">
            {{
              `${dealAmount[0]}억원 ~ ${
                dealAmount[1] != 16 ? dealAmount[1] + "억원" : "무제한"
              }`
            }}
          </div>
        </div>
        <v-range-slider
          v-model="dealAmount"
          min="0"
          max="16"
          ticks
          tick-size="3"
          track-color="shades"
          @end="searchByFilters"
        >
        </v-range-slider>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between filter_header">
          <div class="text-h7 font-weight-bold">사용승인일</div>
          <div class="subheading font-weight-light mr-1">
            {{
              `${buildYear[0]}년 ~ ${
                buildYear[1] != 31 ? buildYear[1] + "년" : "무제한"
              }`
            }}
          </div>
        </div>
        <v-range-slider
          v-model="buildYear"
          min="0"
          max="31"
          ticks
          tick-size="3"
          track-color="shades"
          @end="searchByFilters"
        >
        </v-range-slider>
        <v-divider></v-divider>
        <div class="d-flex justify-space-between filter_header">
          <div class="text-h7 font-weight-bold">전용면적</div>
          <div class="subheading font-weight-light mr-1">
            {{
              `${area[0]}&#13217; ~ ${
                area[1] != 151 ? area[1] + "&#13217;" : "무제한"
              }`
            }}
          </div>
        </div>
        <v-range-slider
          v-model="area"
          min="0"
          max="151"
          track-color="shades"
          @end="searchByFilters"
        >
        </v-range-slider>
      </div>
    </v-card>
    <div id="map" style="width: 100%; height: 100%"></div>
    <v-card
      max-width="400"
      class="mx-auto"
      id="right_side_bar"
      height="100%"
      v-click-outside="closeSidePanel"
    >
      <v-container v-if="showSidePanel">
        <v-row dense>
          <v-col cols="12">
            <v-card color="#ff4500" dark>
              <v-card-title class="text-h6">{{
                house.houseInfo.aptName
              }}</v-card-title>
              <v-card-subtitle
                >{{
                  [
                    house.houseInfo.sidoName,
                    house.houseInfo.gugunName,
                    house.houseInfo.dongName,
                    house.houseInfo.jibun,
                  ].join(" ")
                }}
              </v-card-subtitle>
            </v-card>

            <v-btn
              icon
              color="yellow"
              class="like_button"
              x-large
              v-if="doILikeThisApt"
              @click="unlikeThisApt(house.houseInfo.aptCode)"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
            <v-btn
              icon
              color="shades"
              class="like_button"
              x-large
              v-else
              @click="likeThisApt"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="12">
            <apt-price-component :house="house"></apt-price-component>
          </v-col>
          <v-col cols="12">
            <apt-info-component
              :houseDetailInfo="house.houseDetailInfo"
              :houseInfo="house.houseInfo"
            ></apt-info-component>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from "vuex";
import AptInfoComponent from "@/components/AptInfoComponent.vue";
import AptPriceComponent from "@/components/AptPriceComponent.vue";
export default {
  name: "MapView",
  props: {},
  components: {
    AptInfoComponent,
    AptPriceComponent,
  },
  data() {
    return {
      map: null,
      overlays: [],
      showSidePanel: false,
      showFilters: false,
      selectedDong: null,
      selectedApt: null,
      isSearched: false,
      keyword: "",
      buildYear: [0, 31],
      dealAmount: [0, 16],
      area: [0, 151],
    };
  },
  created() {},
  mounted() {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap);
    script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP_API_KEY}`;
    document.head.appendChild(script);
  },
  computed: {
    ...mapState("houseStore", ["houses", "house", "lat", "lng", "dongs"]),
    // ...mapGetters("houseStore", ["positions"]),
    doILikeThisApt() {
      return this.house.likeThisApt;
    },
  },
  methods: {
    likeThisApt() {
      confirm("이 아파트를 관심아파트에 지정하시겠습니까?");
      this.POST_LIKE_THIS_APT();
    },
    unlikeThisApt(aptCode) {
      confirm("이 아파트를 관심아파트에서 삭제하시겠습니까?");
      this.POST_UNLIKE_THIS_APT(aptCode);
    },
    closeFilters() {
      this.showFilters = false;
    },
    openFilters() {
      this.showFilters = true;
    },
    searchByFilters() {
      this.fetchAptsAroundCurrentPosition({
        dealAmountLowerBound: this.dealAmount[0] * 10000,
        dealAmountUpperBound: this.dealAmount[1] * 10000,
        buildYearLowerBound: this.buildYear[0],
        buildYearUpperBound: this.buildYear[1],
        areaLowerBound: this.area[0],
        areaUpperBound: this.area[1],
        lat: this.lat,
        lng: this.lng,
      });
    },
    closeSearchedResult() {
      this.isSearched = false;
    },
    closeSidePanel() {
      this.showSidePanel = false;
    },
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(this.lat, this.lng), //지도의 중심좌표.
        level: 4, //지도의 레벨(확대, 축소 정도)
      };
      this.map = new kakao.maps.Map(container, options);
      this.$store.dispatch("houseStore/FETCH_LIKED_HOUSES").then(() => {
        this.map.setCenter(new kakao.maps.LatLng(this.lat, this.lng));
        this.fetchAptsAroundCurrentPosition({
          lat: this.lat,
          lng: this.lng,
        });
        this.addCenterChangedEventListener();
      });
    },
    addCenterChangedEventListener() {
      // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(this.map, "dragend", () => {
        // 지도 중심좌표를 얻어옵니다
        let latlng = this.map.getCenter();
        this.SET_CURRENT_POSITION(latlng);
        this.fetchAptsAroundCurrentPosition({
          lat: this.lat,
          lng: this.lng,
        });
      });
    },
    drawMarkerWithInfoWindow(positionsAndContents) {
      for (let overlay of this.overlays) {
        overlay.setMap(null);
      }
      this.overlays = [];
      for (let positionAndContent of positionsAndContents) {
        // 커스텀 오버레이를 생성합니다
        var mapCustomOverlay = new kakao.maps.CustomOverlay({
          position: positionAndContent.position,
          content: positionAndContent.content,
          xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
          yAnchor: 1.1, // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
        });
        this.overlays.push(mapCustomOverlay);
        mapCustomOverlay.setMap(this.map);
      }
      document.querySelectorAll(".overlay_info").forEach((overlay) => {
        overlay.addEventListener("click", (event) => {
          document
            .querySelectorAll(".overlay_info_title_focused")
            .forEach((element) => {
              element.className = "overlay_info_title";
            });
          event.target.closest(".overlay_info").children[0].className =
            "overlay_info_title_focused";
          this.showDetailedAptInfo(overlay.dataset.aptcode);
        });
      });
    },
    showDetailedAptInfo(aptCode) {
      this.showSidePanel = false;
      this.$store
        .dispatch("houseStore/FETCH_DETAILED_APT_INFO", aptCode)
        .then(() => {
          this.showSidePanel = true;
        });
    },
    fetchAptsAroundCurrentPosition(params) {
      this.$store
        .dispatch("houseStore/FETCH_APTS_AROUND_CURRENT_POSITION", params)
        .then(() => {
          return this.houses.map((house) => {
            var content = `<div class="overlay_info" data-aptcode="${house.aptCode}">`;
            if (
              house.aptCode == this.selectedApt ||
              (this.house != null &&
                this.house.houseInfo.aptCode == house.aptCode)
            ) {
              content += `    <span class="overlay_info_title_focused">${house.aptName}</span>`;
            } else {
              content += `    <span class="overlay_info_title">${house.aptName}</span>`;
            }
            content += '    <div class="desc">';
            content += `        <span class="address">매매 <strong>${(
              house.minPrice / 10000
            ).toFixed(1)}억 ~ ${(house.maxPrice / 10000).toFixed(1)}억</span>`;
            content += "    </div>";
            content += "</div>";
            return {
              content: content,
              aptCode: house.aptCode,
              position: new window.kakao.maps.LatLng(house.lat, house.lng),
            };
          });
        })
        .then((positionsAndContents) => {
          this.drawMarkerWithInfoWindow(positionsAndContents);
        });
    },
    searchByKeyword() {
      if (this.keyword === null) {
        this.keyword = "";
      }
      this.isSearched = true;
      this.FETCH_SEARCHED_RESULT({ keyword: this.keyword });
    },
    ...mapActions("houseStore", [
      "FETCH_DETAILED_APT_INFO",
      "FETCH_SEARCHED_RESULT",
      "POST_LIKE_THIS_APT",
      "POST_UNLIKE_THIS_APT",
    ]),
    ...mapMutations("houseStore", ["SET_CURRENT_POSITION"]),
  },
  watch: {
    selectedApt(newSelectedItem) {
      if (newSelectedItem === undefined) return;
      let go = this.houses.find((house) => house.aptCode == newSelectedItem);
      var center = new kakao.maps.LatLng(go.lat, go.lng);
      this.map.setCenter(center);
      this.SET_CURRENT_POSITION(center);
      this.fetchAptsAroundCurrentPosition({ lat: this.lat, lng: this.lng });
      this.showDetailedAptInfo(go.aptCode);
    },
    selectedDong(newSelectedItem) {
      if (newSelectedItem === undefined) return;
      let go = this.dongs.find((dong) => dong.dongCode == newSelectedItem);
      var center = new kakao.maps.LatLng(go.lat, go.lng);
      this.map.setCenter(center);
      this.SET_CURRENT_POSITION(center);
      this.fetchAptsAroundCurrentPosition({ lat: this.lat, lng: this.lng });
    },
  },
};
</script>

<style></style>
