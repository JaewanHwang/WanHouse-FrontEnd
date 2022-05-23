<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title> HappyHouse </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <router-link :to="{ name: 'home' }" class="link">
          <v-btn text>home</v-btn>
        </router-link>
        <router-link :to="{ name: 'user' }" class="link">
          <v-btn text>user</v-btn>
        </router-link>
        <router-link :to="{ name: 'map' }" class="link">
          <v-btn text>map</v-btn>
        </router-link>
        <router-link :to="{ name: 'board' }" class="link">
          <v-btn text>board</v-btn>
        </router-link>
        <router-link :to="{ name: 'qna' }" class="link">
          <v-btn text>qna</v-btn>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "HeaderNaviBar",

  data: () => ({}),
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
