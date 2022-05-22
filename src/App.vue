<template>
  <div id="app">
    <navi-bar />
    <router-view />
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
  component: {},
};
</script>
