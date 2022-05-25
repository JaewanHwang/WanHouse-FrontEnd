<template>
  <v-container style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <div class="pa-5">
            <h3 style="text-align: center" class="mb-4">Login</h3>
            <form>
              <v-text-field
                label="ID"
                class="font-weight-bold"
                type="text"
                id="userId"
                ref="userId"
                v-model="user.userId"
              ></v-text-field>
              <v-text-field
                label="PASSWORD"
                class="font-weight-bold"
                type="password"
                id="password"
                ref="password"
                v-model="user.password"
              ></v-text-field>
              <br />
              <v-btn
                color="font-weight-bold light-blue darken-3"
                depressed
                large
                block
                dark
                class="mb-3"
                @click.prevent="confirm"
                >로그인</v-btn
              >
              <v-btn
                depressed
                large
                block
                dark
                class="font-weight-bold mb-3"
                @click="moveRegister"
                >회원가입</v-btn
              >
            </form>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const userStore = "userStore";

export default {
  name: "UserLogin",
  data() {
    return {
      user: {
        userId: null,
        password: null,
      },
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(userStore, ["userLogin", "getUserInfo"]),
    async confirm() {
      await this.userLogin(this.user);
      if (this.isLogin) {
        await this.getUserInfo(this.user.userId);
        this.$router.push({ name: "home" });
      }
    },
    moveRegister() {
      this.$router.push({ name: "signUp" });
    },
  },
};
</script>

<style></style>
