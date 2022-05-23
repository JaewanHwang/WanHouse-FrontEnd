<template>
  <div id="app">
    <v-app>
      <navi-bar />
      <router-view />
    </v-app>
  </div>
</template>

<script>
import NaviBar from "@/components/layout/NaviBar.vue";

export default {
  name: "App",
  components: {
    NaviBar,
  },

  data: () => ({}),
  // component: {},
};
</script>
