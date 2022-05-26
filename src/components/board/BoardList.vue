<template>
  <b-container class="bv-example-row mt-3">
    <v-col class="text-right">
      <v-btn color="primary" @click="moveWrite()">글쓰기</v-btn>
    </v-col>
    <b-row>
      <b-col v-if="boards.length">
        <b-table-simple hover responsive>
          <b-thead>
            <b-tr>
              <b-th>글번호</b-th>
              <b-th>제목</b-th>
              <b-th>조회수</b-th>
              <b-th>작성자</b-th>
              <b-th>작성일</b-th>
            </b-tr>
          </b-thead>
          <tbody>
            <!-- 하위 component인 ListRow에 데이터 전달(props) -->
            <board-list-item
              v-for="board in boards"
              :key="board.boardNo"
              v-bind="board"
            />
          </tbody>
        </b-table-simple>
      </b-col>
      <b-col v-else class="text-center">도서 목록이 없습니다.</b-col>
    </b-row>
  </b-container>
</template>

<script>
import { listBoard } from "@/api/board.js";
import BoardListItem from "@/components/board/item/BoardListItem";

export default {
  name: "BoardList",
  components: {
    BoardListItem,
  },
  data() {
    return {
      boards: [],
    };
  },
  created() {
    let param = {
      pg: 1,
      spp: 20,
      key: null,
      word: null,
    };
    listBoard(
      param,
      (response) => {
        this.boards = response.data;
      },
      (error) => {
        console.log(error);
      },
    );
  },
  methods: {
    moveWrite() {
      this.$router.push({ name: "boardRegister" });
    },
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>
