import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import MemberList from "../views/MemberList.vue";
import MemberCreate from "@/views/MemberCreate.vue";
import MemberDetail from "@/views/MemberDetail.vue";
import * as firebase from "firebase/app";
import "firebase/auth";

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
    component: MemberList,
    meta: {requiresAuth: true}
  },
  {
    path: "/users/create",
    name: "create_user",
    component: MemberCreate
  },
  {
    path: "/users/:id",
    name: "detail_user",
    component: MemberDetail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requiresAuth && !isAuthenticated) {
    //next("/login");
    next("/");
  } else {
    next();
  }
});

export default router;
