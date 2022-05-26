<template>
  <v-container class="bv-example-row mt-3">
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
