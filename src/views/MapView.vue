<template>
  <div style="width: 100%; height: 95%; position: relative">
    <v-tabs>
      <v-tab>아파트 검색</v-tab>
      <v-tab>관심 아파트</v-tab>
    </v-tabs>
    <div id="search-container">
      <v-toolbar dense floating elevation="10">
        <v-text-field
          hide-details
          prepend-icon="mdi-magnify"
          filled
          label="법정동 혹은 아파트"
          clearable
        ></v-text-field>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
    </div>

    <div id="map" style="width: 100%; height: 100%"></div>
  </div>
</template>
<script>
export default {
  name: "MapView",
  props: {},
  data() {
    return { map: null };
  },
  mounted() {
    const script = document.createElement("script");
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap);
    script.src = `http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP_API_KEY}`;
    document.head.appendChild(script);
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.5139848, 127.0565207), //지도의 중심좌표.
        level: 5, //지도의 레벨(확대, 축소 정도)
      };
      this.map = new kakao.maps.Map(container, options);
    },
  },
};
</script>
<style scoped>
#search-container {
  position: absolute;
  top: 6rem;
  left: 3rem;
  z-index: 2;
}
</style>
