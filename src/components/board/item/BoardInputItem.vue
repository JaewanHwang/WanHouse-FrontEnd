<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="userId-group"
          label="작성자:"
          label-for="userId"
          description="작성자를 입력하세요."
        >
          <b-form-input
            id="userId"
            disabled
            v-model="board.userId"
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="title-group"
          label="제목:"
          label-for="title"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="title"
            v-model="board.title"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="board.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button
          type="submit"
          variant="primary"
          class="m-1"
          v-if="this.type === 'register'"
          >글작성</b-button
        >
        <b-button type="submit" variant="primary" class="m-1" v-else
          >글수정</b-button
        >
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { writeBoard, getBoard, modifyBoard } from "@/api/board";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "BoardInputItem",
  data() {
    return {
      board: {
        boardNo: 0,
        title: "",
        content: "",
        userId: "",
      },
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    if (this.type === "modify") {
      getBoard(
        this.$route.params.boardNo,
        ({ data }) => {
          // this.board.boardNo = data.board.boardNo;
          // this.board.userId = data.board.userId;
          // this.board.title = data.board.title;
          // this.board.content = data.board.content;
          this.board = data;
        },
        (error) => {
          console.log(error);
        },
      );
      this.isUserId = true;
    } else {
      this.board.userId = this.userInfo.userId;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.board.userId &&
        ((msg = "작성자 입력해주세요"),
        (err = false),
        this.$refs.userId.focus());
      err &&
        !this.board.title &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err &&
        !this.board.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registBoard() : this.modifyBoard();
    },
    onReset(event) {
      event.preventDefault();
      this.board.boardNo = 0;
      this.board.title = "";
      this.board.content = "";
      this.$router.push({ name: "boardList" });
    },
    registBoard() {
      writeBoard(
        {
          title: this.board.title,
          content: this.board.content,
          userId: this.board.userId,
        },
        ({ data }) => {
          console.log(data);
          this.moveList();
        },
        (error) => {
          console.log(error);
        },
      );
    },
    modifyBoard() {
      modifyBoard(
        {
          boardNo: this.board.boardNo,
          title: this.board.title,
          content: this.board.content,
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "boardList" });
        },
        (error) => {
          console.log(error);
        },
      );
    },
    moveList() {
      this.$router.push({ name: "boardList" });
    },
  },
};
</script>

<style></style>
