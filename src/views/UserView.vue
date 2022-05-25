<template>
  <div>
    <form>
      <label for="userId">아이디</label>
      <input type="text" id="userId" ref="userId" v-model="user.userId" />
      <br />
      <button @click.prevent="idCheck">중복확인</button>
      <br />
      <label for="password">password</label>
      <input type="text" id="password" ref="password" v-model="user.password" />
      <br />
      <label for="userName">이름</label>
      <input type="text" id="userName" ref="userName" v-model="user.userName" />
      <br />
      <label for="userAddress">userAddress</label>
      <input
        type="text"
        id="userAddress"
        ref="userAddress"
        v-model="user.userAddress"
      />
      <br />
      <label for="userPhoneNumber">userPhoneNumber</label>
      <input
        type="text"
        id="userPhoneNumber"
        ref="userPhoneNumber"
        v-model="user.userPhoneNumber"
      />
      <br />

      <button @click.prevent="checkVal">등록</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  props: {
    msg: String,
  },
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
      alert("서버에 전송했엉~");
    },

    idCheck() {
      if (this.user.userId == "123") {
        alert("중복이야~~");
      } else {
        alert("중복아니야~!");
      }
      return;
    },
  },
};
</script>
