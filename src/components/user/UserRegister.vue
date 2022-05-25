<template>
  <v-container style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <div class="pa-5">
            <h3 style="text-align: center" class="mb-8">Register</h3>
            <v-form ref="form">
              <v-text-field
                label="ID"
                class="font-weight-bold"
                type="text"
                id="userId"
                ref="userId"
                v-model="user.userId"
              ></v-text-field>
              <!-- :rules="register" -->
              <!-- 위에 v-text-field에 아래 조건 추가하기 -->
              <!-- :rules="idRules" -->

              <v-text-field
                label="PASSWORD"
                class="font-weight-bold"
                type="password"
                id="password"
                ref="password"
                v-model="user.password"
              ></v-text-field>

              <v-text-field
                label="NAME"
                class="font-weight-bold"
                type="text"
                id="userName"
                ref="userName"
                v-model="user.userName"
              ></v-text-field>

              <v-text-field
                label="ADDRESS"
                class="font-weight-bold"
                type="text"
                id="userAddress"
                ref="userAddress"
                v-model="user.userAddress"
              ></v-text-field>

              <v-text-field
                label="PHONE NUMBER"
                class="font-weight-bold"
                type="text"
                id="userPhoneNumber"
                ref="userPhoneNumber"
                v-model="user.userPhoneNumber"
              ></v-text-field>

              <v-btn
                color="font-weight-bold light-blue darken-3"
                depressed
                large
                block
                dark
                class="mb-3"
                @click.prevent="checkValidateRegister"
              >
                등록
              </v-btn>
              <v-btn
                depressed
                large
                block
                dark
                class="font-weight-bold mb-3"
                @click="moveLogin"
              >
                로그인
              </v-btn>
            </v-form>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { userRegister } from "@/api/user";
// import { checkDuplUserId } from "@/api/user";

export default {
  name: "UserRegister",
  data() {
    return {
      user: {
        userId: "",
        password: "",
        userName: "",
        userAddress: "",
        userPhoneNumber: "",
      },
    };
  },

  methods: {
    checkValidateRegister() {
      if (
        !this.user.userId ||
        !this.user.password ||
        !this.user.userName ||
        !this.user.userAddress ||
        !this.user.userPhoneNumber
      ) {
        alert("필드를 입력해 주세요.");
        return;
      }
      this.register();
    },
    async register() {
      await userRegister(
        this.user,
        () => {
          alert(`회원가입 성공\n 아이디: ${this.user.userId}`);
          this.$router.push({ name: "signIn" });
        },
        (err) => {
          if (err.response.status === 409) {
            alert("아이디가 중복입니다.\n다른 아이디를 입력해 주세요.");
            return;
          }
        },
      );
    },

    // TODO: ID 중복 체크 룰 추가하기
    // idRules() {
    //   const rules = [];
    //   const rule1 = (v) => !!v || "Password is required";
    //   rules.push(rule1);
    //   checkDuplUserId(
    //     this.user.userId,
    //     (response) => {
    //       console.log(response);
    //     },
    //     (error) => {
    //       // 404 면 아이디 중복 없다
    //       // 409 면 아이디 중복 있다
    //       // console.log(error.response.status);
    //       if (error.response.status == 409) {
    //         console.log("중복임");
    //         rules.push("ID 중복");
    //       }
    //     },
    //   );
    //   console.log(rules);
    //   return rules;
    // },

    moveLogin() {
      this.$router.push({ name: "signIn" });
    },
  },
};
</script>

<style></style>
