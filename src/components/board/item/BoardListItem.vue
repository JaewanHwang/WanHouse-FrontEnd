<template>
  <b-tr>
    <b-td>{{ boardNo }}</b-td>
    <b-th class="text-left">
      <router-link
        :to="{ name: 'boardDetail', params: { boardNo: boardNo } }"
        >{{ title }}</router-link
      >
    </b-th>
    <b-td>{{ hit }}</b-td>
    <b-td>{{ userId }}</b-td>
    <b-td>{{ lastModified | dateFormat }}</b-td>
  </b-tr>
</template>

<script>
import moment from "moment";

export default {
  name: "BoardListItem",
  props: {
    boardNo: Number,
    title: String,
    content: String,
    lastModified: String,
    userId: String,
    hit: Number,
  },
  filters: {
    dateFormat(lastModified) {
      return moment(new Date(lastModified)).format("YY.MM.DD");
    },
  },
};
</script>

<style></style>
