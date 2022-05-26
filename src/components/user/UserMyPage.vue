<template>
  <v-container style="max-width: 450px">
    <v-layout align-center row wrap>
      <v-flex xs12>
        <v-card>
          <div class="pa-5">
            <h3 style="text-align: center" class="mb-8">Info</h3>
            <v-list>
              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-account</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ userInfo.userId }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider inset></v-divider>

              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-account-outline</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{ userInfo.userName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider inset></v-divider>

              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-map-marker</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{
                    userInfo.userAddress
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-divider inset></v-divider>

              <v-list-item>
                <v-list-item-action>
                  <v-icon>mdi-phone</v-icon>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>{{
                    userInfo.userPhoneNumber
                  }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
            <v-card-actions>
              <v-flex class="text-right">
                <v-btn
                  color="font-weight-bold light-blue darken-3"
                  depressed
                  large
                  dark
                  class="ma-3"
                  @click="moveEdit"
                >
                  수정하기
                </v-btn>
              </v-flex>
              <v-flex>
                <v-btn
                  color="red"
                  depressed
                  large
                  dark
                  class="font-weight-bold ma-3"
                  @click="removeUser"
                >
                  탈퇴하기
                </v-btn>
              </v-flex>
            </v-card-actions>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "UserMyPage",
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },

  methods: {
    moveEdit() {
      this.$router.push({ name: "edit" });
      return;
    },
    removeUser() {
      let isdelete = confirm(
        "정말로 탈퇴하시겠습니까?\n해당 계정은 즉시 삭제됩니다.",
      );
      if (isdelete) {
        // TODO: 탈퇴 api 불러오기
        alert("계정이 삭제되었습니다.");
      }
      return;
    },
  },
};
</script>

<style></style>
