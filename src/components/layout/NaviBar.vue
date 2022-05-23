<template>
  <div>
    <h1>HappyHouse</h1>
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
  </div>
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
