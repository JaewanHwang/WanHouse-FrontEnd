<template>
  <div>
    <form>
      <label for="userid">아이디</label>
      <input type="text" id="userid" ref="userid" v-model="userid" />
      <button @click.prevent="sendId">중복확인</button>
      <br />
      <label for="username">이름</label>
      <input type="text" id="username" ref="username" v-model="username" />
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
      userid: "",
      username: "",
    };
  },
  methods: {
    checkVal() {
      if (!this.userid) {
        alert("아이디를 입력하세요!!");
        this.$refs.userid.focus();
        return;
      } else if (!this.username) {
        alert("이름을 입력하세요!!");
        this.$refs.username.focus();
        return;
      }
      this.register();
    },

    register() {
      alert("서버에 전송했엉~");
    },

    sendId() {
      if (this.userid == "123") {
        alert("중복이야~~");
      } else {
        alert("합격!");
      }
      return;
    },
  },
};
</script>
