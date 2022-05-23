<template>
  <v-app>
    <v-main>
      <navi-bar />
      <router-view />
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
<style></style>
