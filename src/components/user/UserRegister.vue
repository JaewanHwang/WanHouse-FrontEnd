<template>
  <v-container style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <div class="pa-5">
            <h3 style="text-align: center" class="m-8">Register</h3>
            <form>
              <v-text-field
                label="ID"
                class="font-weight-bold"
                type="text"
                id="userId"
                ref="userId"
                v-model="user.userId"
              ></v-text-field>
              <button @click.prevent="idCheck">중복확인</button>

              <v-text-field
                label="PASSWORD"
                class="font-weight-bold"
                type="password"
                id="password"
                ref="password"
                v-model="user.password"
              ></v-text-field>

              <v-text-field
                label="ID"
                class="font-weight-bold"
                type="text"
                id="userName"
                ref="userName"
                v-model="user.userName"
              ></v-text-field>

              <v-text-field
                label="ID"
                class="font-weight-bold"
                type="text"
                id="userAddress"
                ref="userAddress"
                v-model="user.userAddress"
              ></v-text-field>

              <v-text-field
                label="ID"
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
                @click.prevent="checkVal"
              >
                등록하기
              </v-btn>
              <v-btn
                depressed
                large
                block
                dark
                class="font-weight-bold mb-3"
                @click.prevent="moveLogin"
              >
                로그인하기
              </v-btn>
            </form>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { signUp } from "@/api/user";

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
    checkVal() {
      if (!this.user.userId) {
        alert("아이디를 입력하세요!!");
        this.$refs.user.userId.focus();
        return;
      } else if (!this.user.userName) {
        alert("이름을 입력하세요!!");
        this.$refs.user.userName.focus();
        return;
      }
      this.register();
    },

    register() {
      signUp(
        {
          userId: this.user.userId,
          password: this.user.password,
          userName: this.user.userName,
          userAddress: this.user.userAddress,
          userPhoneNumber: this.user.userPhoneNumber,
        },
        (res) => {
          console.log(res);
          alert("회원가입 성공!");
        },
        (error) => {
          console.log("에러", error);
          this.moveLogin();
        },
      );
    },

    idCheck() {
      if (this.user.userId == "123") {
        alert("중복이야~~");
      } else {
        alert("중복아니야~!");
      }
      return;
    },
    moveLogin() {
      this.$router.push({ name: "signIn" });
    },
  },
};
</script>

<style></style>
