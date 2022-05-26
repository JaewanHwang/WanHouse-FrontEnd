<template>
  <div>
    <v-container>
      <section class="hero">
        <div class="hero-text container">
          <div class="my-2 text-center">
            <div class="text-h2">당신의 하나뿐인 소중한 집</div>
            <br />
            <div class="text-h4">
              <span class="text-h3">WANHOUSE</span>에서 찾으세요
            </div>
            <br />
            <br />
            <v-btn x-large color="primary" dark @click="goToLogin">
              시작하기
            </v-btn>
          </div>
        </div>
      </section>
      <v-row>
        <v-col cols="12">
          <v-footer dark padless>
            <v-card
              flat
              tile
              class="indigo lighten-1 white--text text-center"
              min-width="100%
              "
            >
              <v-card-text>
                <v-btn
                  v-for="icon in icons"
                  :key="icon"
                  class="mx-4 white--text"
                  icon
                  @click="goToGitHub"
                >
                  <v-icon size="24px">
                    {{ icon }}
                  </v-icon>
                </v-btn>
              </v-card-text>
              2022/05/26 SSAFY 7기 서울 9반 황재완, 김완상
              <v-divider></v-divider>

              <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>황재완, 김완상</strong>
              </v-card-text>
            </v-card>
          </v-footer>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
    };
  },
  methods: {
    goToGitHub() {
      location.href = "https://github.com/JaewanHwang";
    },
    goToLogin() {
      this.$router.replace("/user/signin");
    },
  },
};
</script>

<style lang="scss" scoped>
.hero {
  background-image: url("@/assets/img/background.jpg");
  background-attachment: fixed;
  position: relative;
  height: 74vh;
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
