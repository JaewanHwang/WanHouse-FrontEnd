<template>
  <v-container>
    <v-toolbar flat>
      <v-col>
        <v-toolbar-title>
          Happy House
          <!-- <v-img src="@/assets/logo.png" max-height="80" max-width="80"></v-img> -->
        </v-toolbar-title>
      </v-col>
      <v-col>
        <v-toolbar-items>
          <router-link :to="{ name: 'home' }" class="link">
            <button text>home</button>
          </router-link>
          <router-link :to="{ name: 'user' }" class="link">
            <button text>user</button>
          </router-link>
          <router-link :to="{ name: 'map' }" class="link">
            <button text>map</button>
          </router-link>
          <router-link :to="{ name: 'board' }" class="link">
            <button text>board</button>
          </router-link>
          <router-link :to="{ name: 'qna' }" class="link">
            <button text>qna</button>
          </router-link>
        </v-toolbar-items>
      </v-col>
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
