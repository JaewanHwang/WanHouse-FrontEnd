<template>
  <v-container class="bv-example-row mt-3">
    <v-row>
      <v-col>
        <h5 style="text-center">글작성</h5>
      </v-col>
    </v-row>
    <board-input-item type="register" />
  </v-container>
</template>

<script>
import BoardInputItem from "@/components/board/item/BoardInputItem.vue";

export default {
  name: "BoardWrite",
  components: {
    BoardInputItem,
  },
};
</script>

<style></style>
