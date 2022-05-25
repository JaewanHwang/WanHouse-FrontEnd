<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div id="map" style="width: 100%; height: 100%"></div>
    <v-card
      max-width="500"
      class="mx-auto overflow-y-auto"
      id="right_side_bar"
      height="100%"
    >
      <v-expansion-panels popout>
        <v-expansion-panel v-for="(likedHouse, i) in likedHouses" :key="i">
          <v-expansion-panel-header
            hide-actions
            @click="showDetailedAptInfo(likedHouse.aptCode)"
          >
            <v-row dense>
              <v-col cols="12">
                <v-card color="#ff4500" dark>
                  <v-card-title class="text-h6">{{
                    likedHouse.aptName
                  }}</v-card-title>
                  <v-card-subtitle
                    >{{
                      [
                        likedHouse.sidoName,
                        likedHouse.gugunName,
                        likedHouse.dongName,
                        likedHouse.jibun,
                      ].join(" ")
                    }}
                  </v-card-subtitle>
                </v-card>

                <v-btn
                  icon
                  color="yellow"
                  class="like_button"
                  x-large
                  @click.stop="unlikeThisApt(likedHouse.aptCode)"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-container>
              <v-row dense>
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
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
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
      overlay: null,
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
    ...mapState("houseStore", [
      "houses",
      "house",
      "lat",
      "lng",
      "dongs",
      "likedHouses",
    ]),
    // ...mapGetters("houseStore", ["positions"]),
    doILikeThisApt() {
      return this.house.likeThisApt;
    },
  },
  methods: {
    unlikeThisApt(aptCode) {
      confirm("이 아파트를 관심아파트에서 삭제하시겠습니까?");
      this.REMOVE_LIKED_HOUSE(aptCode);
      this.POST_UNLIKE_THIS_APT(aptCode);
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
      });
      this.addCenterChangedEventListener();
    },
    addCenterChangedEventListener() {
      // 마우스 드래그로 지도 이동이 완료되었을 때 마지막 파라미터로 넘어온 함수를 호출하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(this.map, "dragend", () => {
        // 지도 중심좌표를 얻어옵니다
        let latlng = this.map.getCenter();
        this.SET_CURRENT_POSITION(latlng);
      });
    },
    drawMarkerWithInfoWindow(positionAndContent) {
      this.SET_CURRENT_POSITION(positionAndContent.position);
      this.map.setCenter(positionAndContent.position);
      if (this.overlay != null) {
        this.overlay.setMap(null);
      }
      // 커스텀 오버레이를 생성합니다
      var mapCustomOverlay = new kakao.maps.CustomOverlay({
        position: positionAndContent.position,
        content: positionAndContent.content,
        xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
        yAnchor: 1.1, // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
      });
      this.overlay = mapCustomOverlay;
      mapCustomOverlay.setMap(this.map);
    },
    showDetailedAptInfo(aptCode) {
      this.$store
        .dispatch("houseStore/FETCH_DETAILED_APT_INFO", aptCode)
        .then(() => {
          this.drawMarkerWithInfoWindow(this.moveCenterAndDrawOverlay(aptCode));
        });
    },
    moveCenterAndDrawOverlay(aptCode) {
      var content = `<div class="overlay_info" data-aptcode="${aptCode}">`;
      for (let i in this.likedHouses) {
        if (this.likedHouses[i].aptCode == aptCode) {
          content += `    <span class="overlay_info_title_focused">${this.likedHouses[i].aptName}</span>`;
          var likedHouse = this.likedHouses[i];
          break;
        }
      }
      content += '    <div class="desc">';
      content += `        <span class="address">매매 <strong>${(
        likedHouse.minPrice / 10000
      ).toFixed(1)}억 ~ ${(likedHouse.maxPrice / 10000).toFixed(1)}억</span>`;
      content += "    </div>";
      content += "</div>";
      return {
        content: content,
        aptCode: likedHouse.aptCode,
        position: new window.kakao.maps.LatLng(likedHouse.lat, likedHouse.lng),
      };
    },
    ...mapActions("houseStore", [
      "FETCH_DETAILED_APT_INFO",
      "FETCH_SEARCHED_RESULT",
      "POST_LIKE_THIS_APT",
      "POST_UNLIKE_THIS_APT",
    ]),
    ...mapMutations("houseStore", [
      "SET_CURRENT_POSITION",
      "REMOVE_LIKED_HOUSE",
    ]),
  },
};
</script>

<style scoped></style>
