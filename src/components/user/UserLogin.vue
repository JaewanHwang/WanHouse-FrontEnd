<template>
  <v-container style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <div class="pa-5">
            <h3 style="text-align: center" class="mb-8">Login</h3>
            <v-form ref="form">
              <v-text-field
                label="ID"
                class="font-weight-bold"
                type="text"
                id="userId"
                ref="userId"
                v-model="user.userId"
                :rules="idRules"
              ></v-text-field>
              <v-text-field
                label="PASSWORD"
                class="font-weight-bold"
                type="password"
                id="password"
                ref="password"
                v-model="user.password"
                :rules="passwordRules"
              ></v-text-field>
              <br />

              <v-btn
                color="font-weight-bold light-blue darken-3"
                depressed
                large
                block
                dark
                class="mb-3"
                @click="checkValidateLogin"
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
            </v-form>
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
      // 데이터로 rule 설정하기
      idRules: [
        (v) => !!v || "ID is required",
        (v) => (v && v.length <= 16) || "ID must be less than 16 characters",
        (v) => (v && v.length >= 2) || "ID must be over than 2 characters",
      ],
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError"]),

    // 함수로 rule 설정하기
    passwordRules() {
      const rules = [];
      const rule1 = (v) => !!v || "Password is required";
      const rule2 = (v) =>
        (v && v.length <= 40) || "Password must be less than 40 characters";
      const rule3 = (v) =>
        (v && v.length >= 2) || "Password must be over than 2 characters";
      rules.push(rule1, rule2, rule3);
      return rules;
    },
  },
  methods: {
    ...mapActions(userStore, ["userLogin", "getUserInfo"]),
    checkValidateLogin() {
      if (!this.user.userId || !this.user.password) {
        this.$refs.form.validate();
        return;
      }
      this.confirm();
    },
    async confirm() {
      await this.userLogin(this.user);
      if (this.isLogin) {
        await this.getUserInfo(this.user.userId);
        alert("로그인이 되었습니다.");
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
