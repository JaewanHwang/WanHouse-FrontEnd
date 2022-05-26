import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import MapView from "@/views/MapView.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/UserView.vue"),
    children: [
      {
        path: "signin",
        name: "signIn",
        component: () => import("@/components/user/UserLogin.vue"),
      },
      {
        path: "singup",
        name: "signUp",
        component: () => import("@/components/user/UserRegister.vue"),
      },
      {
        path: "mypage",
        name: "myPage",
        component: () => import("@/components/user/UserMyPage.vue"),
      },
      {
        path: "edit",
        name: "edit",
        component: () => import("@/components/user/UserEdit.vue"),
      },
    ],
  },
  {
    path: "/map",
    name: "map",
    // component: () => import("@/views/MapView.vue"),
    component: MapView,
    redirect: "/map/search",
    children: [
      {
        path: "search",
        name: "map-search",
        component: () => import("@/views/MapSearchView.vue"),
      },
      {
        path: "like",
        name: "map-like",
        component: () => import("@/views/MapLikeView.vue"),
      },
    ],
  },
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/BoardView.vue"),
    redirect: "/board/list",
    children: [
      {
        path: "list",
        name: "boardList",
        component: () => import("@/components/board/BoardList.vue"),
      },
      {
        path: "write",
        name: "boardRegister",
        component: () => import("@/components/board/BoardRegister.vue"),
      },
      {
        path: "detail/:articleno",
        name: "boardDetail",
        component: () => import("@/components/board/BoardDetail.vue"),
      },
      {
        path: "modify/:articleno",
        name: "boardModify",
        component: () => import("@/components/board/BoardModify.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
