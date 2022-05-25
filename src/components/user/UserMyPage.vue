<template>
  <div>
    <h1>회원 조회</h1>
    <h1>{{ userInfo.userId }}</h1>
    <h1>{{ userInfo.password }}</h1>
    <h1>{{ userInfo.userName }}</h1>
    <h1>{{ userInfo.userAddress }}</h1>
    <h1>{{ userInfo.userPhoneNumber }}</h1>
    <v-btn>회원 수정</v-btn>
    <v-btn>회원 탈퇴</v-btn>
  </div>
</template>

<script>
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "UserMyPage",
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
};
</script>

<style></style>
