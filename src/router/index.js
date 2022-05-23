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
  },
  {
    path: "/map",
    name: "map",
    // component: () => import("@/views/MapView.vue"),
    component: MapView,
  },
  {
    path: "/board",
    name: "board",
    component: () => import("@/views/BoardView.vue"),
  },
  {
    path: "/qna",
    name: "qna",
    component: () => import("@/views/QnaView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
