<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-left">
        <v-btn color="primary" @click="listBoard">목록</v-btn>
      </b-col>
      <b-col class="text-right">
        <v-btn color="primary" size="sm" @click="moveModifyBoard" class="mr-2"
          >글수정</v-btn
        >
        <v-btn dark size="sm" @click="deleteBoard">글삭제</v-btn>
      </b-col>
    </b-row>
    <b-row class="mb-1">
      <b-col>
        <b-card
          :header-html="`<h3>${board.boardNo}.
          ${board.title} [${board.hit}]</h3><div><h6>${
            board.userId
          }</div><div>${board.lastModified || dateFormat}</h6></div>`"
          class="mb-2"
          border-variant="dark"
          no-body
        >
          <b-card-body class="text-left">
            <div v-html="message"></div>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import moment from "moment";
import { getBoard, deleteBoard } from "@/api/board";

export default {
  name: "BoardDetail",
  data() {
    return {
      board: {},
    };
  },
  computed: {
    message() {
      if (this.board.content)
        return this.board.content.split("\n").join("<br>");
      return "";
    },
  },
  created() {
    getBoard(
      this.$route.params.boardNo,
      (response) => {
        this.board = response.data;
      },
      (error) => {
        console.log("삭제시 에러발생!!", error);
      },
    );
  },
  methods: {
    listBoard() {
      this.$router.push({ name: "boardList" });
    },
    moveModifyBoard() {
      this.$router.replace({
        name: "boardModify",
        params: { boardNo: this.board.boardNo },
      });
      //   this.$router.push({ path: `/board/modify/${this.board.boardNo}` });
    },
    deleteBoard() {
      if (confirm("정말로 삭제?")) {
        deleteBoard(this.board.boardNo, () => {
          this.$router.push({ name: "boardList" });
        });
      }
    },
  },
  filters: {
    dateFormat(regtime) {
      return moment(new Date(regtime)).format("YY.MM.DD hh:mm:ss");
    },
  },
};
</script>

<style></style>
