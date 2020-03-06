import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MemberList from "../views/MemberList.vue";
import MemberCreate from "@/views/MemberCreate.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/users",
    name: "users",
    component: MemberList
  },
  {
    path: "/users/create",
    name: "create_user",
    component: MemberCreate
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
