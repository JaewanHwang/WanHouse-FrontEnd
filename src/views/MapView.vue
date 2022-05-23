<template>
  <v-main>
    <v-tabs>
      <v-tab>아파트 검색</v-tab>
      <v-tab>관심 아파트</v-tab>
    </v-tabs>
    <div id="map" style="width: 100%; height: 100%"></div>
  </v-main>
</template>
<script>
export default {
  name: "MapView",
  props: {
    msg: String,
  },
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
