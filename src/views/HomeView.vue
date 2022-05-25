<template>
  <v-container>
    <section class="hero">
      <div class="hero-text container">
        <v-text> </v-text>
        <hr />
      </div>
    </section>
  </v-container>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style lang="scss" scoped>
.hero {
  background-image: url("@/assets/happyhouse.jpg");
  background-attachment: fixed;
  position: relative;
  height: 100vh;
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  .hero-text {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #fff;
  }
  v-text {
    font-size: 30px;
    @media (min-width: 550px) {
      font-size: 50px;
    }
  }
  hr:nth-child(2) {
    max-width: 365px;
    margin-bottom: 16px;
  }
  hr:nth-child(4) {
    height: 6px;
    background-color: #fff;
    border: none;
    max-width: 85px;
    margin-top: 16px;
  }
}
</style>
