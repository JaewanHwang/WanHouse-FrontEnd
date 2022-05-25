<template>
  <v-container>
    <v-toolbar fluid app flat height="50">
      <router-link :to="{ name: 'home' }" class="link black--text">
        <v-toolbar-title class="text-uppercase">
          <span color="black" class="font-weight-bold">Wan</span>
          <span class="font-weight-light">House</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <router-link :to="{ name: 'map' }" class="link">
        <v-btn class="font-weight-bold" text>map</v-btn>
      </router-link>
      <router-link :to="{ name: 'board' }" class="link">
        <v-btn class="font-weight-bold" text>board</v-btn>
      </router-link>
      <router-link :to="{ name: 'qna' }" class="link">
        <v-btn class="font-weight-bold" text>qna</v-btn>
      </router-link>
      <router-link :to="{ name: 'user' }" class="link">
        <v-btn v-show="isLogin" class="font-weight-bold" text>Login</v-btn>
        <v-btn v-show="!isLogin" class="font-weight-bold" text>UserInfo</v-btn>
      </router-link>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "HeaderNaviBar",

  computed: {
    ...mapState(userStore, ["isLogin"]),
  },
};
</script>

<style scope>
a {
  text-decoration: none !important;
}
</style>
