<template>
  <div style="width: 100%; height: 100%; position: relative">
    <div class="map_wrap">
      <div id="map" style="width: 100%; height: 100%"></div>
      <div id="currCategory_buttons">
        <v-btn-toggle v-model="currCategory">
          <v-btn>
            <v-icon>mdi-parking</v-icon>
            주차장
          </v-btn>
          <v-btn>
            <v-icon>mdi-piggy-bank</v-icon>
            은행
          </v-btn>
          <v-btn>
            <v-icon>mdi-coffee</v-icon>
            카페
          </v-btn>

          <v-btn>
            <v-icon>mdi-store-24-hour</v-icon>
            편의점
          </v-btn>
          <v-btn>
            <v-icon>mdi-silverware-fork-knife</v-icon>
            음식점
          </v-btn>
          <v-btn>
            <v-icon>mdi-hospital-box-outline</v-icon>
            병원
          </v-btn>
          <v-btn>
            <v-icon>mdi-baby-carriage</v-icon>
            유치원/어린이집
          </v-btn>
          <v-btn>
            <v-icon>mdi-school</v-icon>
            학교
          </v-btn>
          <v-btn>
            <v-icon>mdi-shopping</v-icon>
            대형마트
          </v-btn>
          <v-btn>
            <v-icon>mdi-subway</v-icon>
            지하철역
          </v-btn>
        </v-btn-toggle>
      </div>
    </div>

    <v-card
      max-width="500"
      class="mx-auto overflow-y-auto"
      id="right_side_bar"
      height="100%"
    >
      <v-expansion-panels popout>
        <v-expansion-panel
          v-for="likedHouse in likedHouses"
          :key="likedHouse.aptCode"
        >
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
          <v-expansion-panel-content v-if="house != null">
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
      currCategory: undefined,
      placeOverlay: {},
      contentNode: {},
      markers: [],
      ps: {},
      categoryList: [
        "PK6",
        "BK9",
        "CE7",
        "CS2",
        "FD6",
        "HP8",
        "PS3",
        "SC4",
        "MT1",
        "SW8",
      ],
    };
  },
  created() {},
  mounted() {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap);
    script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP_API_KEY}&libraries=services`;
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
    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent("on" + type, callback);
      }
    },

    // 카테고리 검색을 요청하는 함수입니다
    searchPlaces() {
      // 커스텀 오버레이를 숨깁니다
      this.placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      this.removeMarker();
      if (this.currCategory == undefined) {
        return;
      }

      this.ps.categorySearch(
        this.categoryList[this.currCategory],
        this.placesSearchCB,
        {
          useMapBounds: true,
        },
      );
    },

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    placesSearchCB(data, status) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        this.displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    },

    // 지도에 마커를 표출하는 함수입니다
    displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = this.addMarker(
          new kakao.maps.LatLng(places[i].y, places[i].x),
        );

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        ((marker, place) => {
          kakao.maps.event.addListener(marker, "click", () => {
            this.displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    },

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    addMarker(position) {
      // 마커 이미지의 이미지 주소입니다
      var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
      // 마커 이미지의 이미지 크기 입니다
      var imageSize = new kakao.maps.Size(24, 35);

      // 마커 이미지를 생성합니다
      var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        map: this.map, // 마커를 표시할 지도
        position: position, // 마커를 표시할 위치
        image: markerImage, // 마커 이미지
      });

      marker.setMap(this.map); // 지도 위에 마커를 표출합니다
      this.markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    },

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    removeMarker() {
      for (var i = 0; i < this.markers.length; i++) {
        this.markers[i].setMap(null);
      }
      this.markers = [];
    },

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    displayPlaceInfo(place) {
      var content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        "</a>";

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content +=
          '    <span title="' +
          place.address_name +
          '">' +
          place.address_name +
          "</span>";
      }

      var c1 = new kakao.maps.LatLng(
        this.house.houseInfo.lat,
        this.house.houseInfo.lng,
      );
      this.placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));

      var c2 = this.placeOverlay.getPosition();
      var poly = new kakao.maps.Polyline({
        path: [c1, c2],
      });

      content +=
        '    <span class="tel">직선 거리:  ' +
        (poly.getLength() / 1000).toFixed(1) +
        "km</span>" +
        "</div>" +
        '<div class="after"></div>';

      this.contentNode.innerHTML = content;
      this.placeOverlay.setMap(this.map);
    },

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

      this.placeOverlay = new kakao.maps.CustomOverlay({
        zIndex: 1,
      });

      this.contentNode = document.createElement("div");

      // 장소 검색 객체를 생성합니다
      this.ps = new kakao.maps.services.Places(this.map);

      // 지도에 idle 이벤트를 등록합니다
      kakao.maps.event.addListener(this.map, "idle", this.searchPlaces);

      // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
      this.contentNode.className = "placeinfo_wrap";

      // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
      // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
      this.addEventHandle(
        this.contentNode,
        "mousedown",
        kakao.maps.event.preventMap,
      );
      this.addEventHandle(
        this.contentNode,
        "touchstart",
        kakao.maps.event.preventMap,
      );

      // 커스텀 오버레이 컨텐츠를 설정합니다
      this.placeOverlay.setContent(this.contentNode);
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
  watch: {
    currCategory() {
      // 카테고리를 클릭했을 때 호출되는 함수입니다
      this.placeOverlay.setMap(null);
      this.searchPlaces();
    },
  },
};
</script>

<style>
.map_wrap,
.map_wrap * {
  margin: 0;
  padding: 0;
  font-size: 12px;
}
.map_wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
#currCategory_buttons {
  position: absolute;
  top: 1rem;
  left: 1rem;
  z-index: 2;
}
.placeinfo_wrap {
  position: absolute;
  bottom: 28px;
  left: -150px;
  width: 280px;
}
.placeinfo {
  position: relative;
  width: 100%;
  border-radius: 6px;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  background: #fff;
}
.placeinfo:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.placeinfo_wrap .after {
  content: "";
  position: relative;
  margin-left: -12px;
  left: 50%;
  width: 22px;
  height: 12px;
  background: url("https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png");
}
.placeinfo a,
.placeinfo a:hover,
.placeinfo a:active {
  color: #fff;
  text-decoration: none;
}
.placeinfo a,
.placeinfo span {
  display: block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}
.placeinfo span {
  margin: 5px 5px 0 5px;
  cursor: default;
  font-size: 13px;
}
.placeinfo .title {
  font-weight: bold;
  font-size: 14px;
  border-radius: 6px 6px 0 0;
  margin: -1px -1px 0 -1px;
  padding: 10px;
  color: #fff;
  background: green
    url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/arrow_white.png)
    no-repeat right 14px center;
}
.placeinfo .tel {
  color: #0f7833;
}
.placeinfo .jibun {
  color: #999;
  font-size: 11px;
  margin-top: 0;
}
</style>
