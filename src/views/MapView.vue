<template>
  <div style="width: 100%; height: 87.5%; position: relative">
    <v-tabs height="3rem" centered>
      <v-tab class="font-weight-black" @click="goToSearch">아파트 검색</v-tab>
      <v-tab class="font-weight-bold" @click="goToLike">관심 아파트</v-tab>
    </v-tabs>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  methods: {
    goToSearch() {
      this.$router.replace("/map/search");
    },
    goToLike() {
      this.$router.replace("/map/like");
    },
  },
};
</script>
<style>
#right_side_bar {
  position: absolute;
  top: 0rem;
  right: 0rem;
  z-index: 2;
}
hr {
  margin-top: 0.2rem !important;
  margin-bottom: 0rem !important;
  border-width: 0.1rem !important;
}
#search-container {
  position: absolute;
  top: 3rem;
  left: 3rem;
  z-index: 2;
  width: 300px;
}
.overlay_info {
  text-align: center;
  border-radius: 6px;
  margin-bottom: 10px;
  float: left;
  position: relative;
  border: 1px solid #ccc;
  border-bottom: 2px solid #ddd;
  background-color: #fff;
}
.overlay_info .overlay_info_title_focused {
  display: block;
  background: orangered;
  text-decoration: none;
  color: #fff;
  padding: 5px 5px 5px 5px;
  font-size: 14px;
  text-align: center;
  font-weight: bolder;
  border-radius: 6px 6px 0 0;
}
.overlay_info:nth-of-type(n) {
  border: 0;
  box-shadow: 0px 1px 2px #888;
}
.overlay_info .overlay_info_title {
  display: block;
  background: blue;
  text-decoration: none;
  color: #fff;
  padding: 5px 5px 5px 5px;
  font-size: 14px;
  font-weight: bolder;
  text-align: center;
  border-radius: 6px 6px 0 0;
}
.overlay_info .desc {
  padding: 5px;
  position: relative;
  min-width: 160px;
  min-height: 30px;
}
.overlay_info .address {
  font-size: 14px;
  color: #333;
  white-space: normal;
}
.overlay_info:after {
  content: "";
  position: absolute;
  margin-left: -11px;
  left: 50%;
  bottom: -12px;
  width: 22px;
  height: 12px;
  background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png)
    no-repeat 0 bottom;
}
.side_panel_title {
  margin-left: 0.5rem;
  padding-top: 0.5rem;
  font-weight: bold;
}

.searched-result {
  position: absolute;
  top: 0rem;
  left: 0rem;
  width: 100%;
  z-index: 2;
}
.v-toolbar__content {
  padding-bottom: 0;
}
.filter_container {
  background: #ffffff;
  position: absolute;
  top: 7.5rem;
  left: 3rem;
  width: 287.4px;
  z-index: 2;
  padding: 1%;
}
.filter_header {
  margin-bottom: 2rem;
  margin-top: 0.5rem;
}
.like_button {
  position: absolute;
  top: 1.5rem;
  right: 1rem;
}
</style>
