<template>
  <v-app>
    <v-main>
      <navi-bar id="header" />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import NaviBar from "@/components/layout/NaviBar.vue";
export default {
  name: "App",
  components: {
    NaviBar,
  },
  data: () => ({
    //
  }),
};
</script>
<style>
#header {
  border-color: #0066cc;
  border-bottom-style: solid;
}
</style>
