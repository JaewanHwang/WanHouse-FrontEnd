<template>
  <v-container style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <div class="pa-5">
            <h3 style="text-align: center" class="mb-8">Edit</h3>
            <v-form ref="form">
              <v-text-field
                label="ID"
                class="font-weight-bold"
                type="text"
                id="userId"
                ref="userId"
                v-model="user.userId"
              ></v-text-field>
              <!-- :rules="register" -->
              <!-- 위에 v-text-field에 아래 조건 추가하기 -->
              <!-- :rules="idRules" -->

              <v-text-field
                label="PASSWORD"
                class="font-weight-bold"
                type="password"
                id="password"
                ref="password"
                v-model="user.password"
              ></v-text-field>

              <v-text-field
                label="NAME"
                class="font-weight-bold"
                type="text"
                id="userName"
                ref="userName"
                v-model="user.userName"
              ></v-text-field>

              <v-text-field
                label="ADDRESS"
                class="font-weight-bold"
                type="text"
                id="userAddress"
                ref="userAddress"
                v-model="user.userAddress"
              ></v-text-field>

              <v-text-field
                label="PHONE NUMBER"
                class="font-weight-bold"
                type="text"
                id="userPhoneNumber"
                ref="userPhoneNumber"
                v-model="user.userPhoneNumber"
              ></v-text-field>
              <v-card-actions>
                <v-flex class="text-right">
                  <v-btn
                    color="font-weight-bold dark-blue darken-3"
                    depressed
                    large
                    dark
                    class="ma-3"
                    @click="moveEdit"
                  >
                    뒤로가기
                  </v-btn>
                </v-flex>
                <v-flex>
                  <v-btn
                    color="primary"
                    depressed
                    large
                    dark
                    class="font-weight-bold ma-3"
                    @click="editUser"
                  >
                    수정하기
                  </v-btn>
                </v-flex>
              </v-card-actions>
            </v-form>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import { mapState, mapMutations } from "vuex";
import { modifyUserById, getUserInfoById } from "@/api/user";

const userStore = "userStore";

export default {
  name: "UserEdit",
  data() {
    return {
      user: {
        userId: "",
        password: "",
        userName: "",
        userAddress: "",
        userPhoneNumber: "",
      },
    };
  },
  created() {
    this.user = this.userInfo;
  },

  computed: {
    ...mapState(userStore, ["userInfo"]),
  },

  methods: {
    ...mapMutations(userStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    moveEdit() {
      this.$router.push({ name: "myPage" });
      return;
    },
    editUser() {
      let isEdit = confirm("정말로 수정하시겠습니까?\n");
      if (isEdit) {
        // TODO: 수정 로직 짜기
        modifyUserById(this.user.userId, this.user)
          .then(
            getUserInfoById(this.user.userId, (res) => {
              this.$store.state.userInfo = res.data;
            }),
          )
          .catch();
        this.$router.push({ name: "main" });
        return;
      }
    },
  },
};
</script>

<style></style>
