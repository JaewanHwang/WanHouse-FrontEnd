<template>
  <v-container class="header_navi" fluid>
    <v-toolbar fluid flat height="50">
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
      <router-link :to="{ name: 'signUp' }" class="link" v-if="!userInfo">
        <v-btn class="font-weight-bold" text>SignUp</v-btn>
      </router-link>
      <router-link :to="{ name: 'signIn' }" class="link" v-if="!userInfo">
        <v-btn class="font-weight-bold" text>Login</v-btn>
      </router-link>
      <div class="text-center" v-if="userInfo">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark v-bind="attrs" v-on="on"> user </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-list-item-title>
                <router-link :to="{ name: 'myPage' }" class="link">
                  <v-btn class="font-weight-bold" text>Info</v-btn>
                </router-link>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn
                  class="font-weight-bold"
                  text
                  @click.prevent="onClickLogout"
                  >LogOut</v-btn
                >
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const userStore = "userStore";

export default {
  name: "HeaderNaviBar",

  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },

  methods: {
    ...mapMutations(userStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      alert("로그아웃 되었습니다.");
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scope>
a {
  text-decoration: none !important;
}
.header_navi {
  padding-left: 5% !important;
  padding-right: 5% !important;
  max-width: 100% !important;
}
</style>
