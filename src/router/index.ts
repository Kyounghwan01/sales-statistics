import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "@/views/SignUp.vue";
import MemberList from "../views/MemberList.vue";
import MemberCreate from "@/views/MemberCreate.vue";
import MemberDetail from "@/views/MemberDetail.vue";
import OrderCreate from "@/views/OrderCreate.vue";
import OrderList from "@/views/OrderList.vue";
import * as firebase from "firebase/app";
import store from "@/store";
import "firebase/auth";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/sign-up",
    name: "sign_up",
    component: SignUp
  },
  {
    path: "/users",
    name: "users",
    component: MemberList,
    meta: { requiresAuth: true }
  },
  {
    path: "/users/create",
    name: "create_user",
    component: MemberCreate,
    meta: { requiresAuth: true }
  },
  {
    path: "/users/edit/:id",
    name: "edut_user",
    component: MemberCreate,
    meta: { requiresAuth: true }
  },
  {
    path: "/users/:id",
    name: "detail_user",
    component: MemberDetail,
    meta: { requiresAuth: true }
  },
  {
    path: "/fill",
    name: "fill_sales",
    component: OrderCreate,
    meta: { requiresAuth: true }
  },
  {
    path: "/orders",
    name: "orders_list",
    component: OrderList,
    meta: { requiresAuth: true }
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
  store.commit("auth/SET_LOGIN_DATA", isAuthenticated);

  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

export default router;
