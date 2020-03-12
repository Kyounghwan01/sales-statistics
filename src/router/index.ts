import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import SignUp from "@/views/SignUp.vue";
import MemberList from "../views/MemberList.vue";
import MemberCreate from "@/views/MemberCreate.vue";
import MemberDetail from "@/views/MemberDetail.vue";
import * as firebase from "firebase/app";
import store from '@/store';
import "firebase/auth";

Vue.use(VueRouter);
// eslint-disable-next-line
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    // meta: {
    //   beforeEach(to: any, from: object, next: any) {
    //     const data = store.getters['auth/loginData'];
    //     console.log(data);
    //     if(store.getters['auth/loginData']) {
    //       next('/users')
    //     } else {
    //       next();
    //     }
    //   }
    // }
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
    path: "/users/:id",
    name: "detail_user",
    component: MemberDetail,
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
  store.commit('auth/SET_LOGIN_DATA', isAuthenticated);

  if (requiresAuth && !isAuthenticated) {
    next("/");
  } else {
    next();
  }
});

router.beforeResolve(async (to, from, next) => {
  try {
    for (const route of to.matched) {
      await new Promise((resolve, reject) => {
        if (route.meta && route.meta.beforeResolve) {
          route.meta.beforeResolve(to, from, (...args: Array<any>) => {
            if (args.length) {
              next(...args);
              reject(new Error("redirected"));
            } else {
              resolve();
            }
          });
        } else {
          resolve();
        }
      });
    }
  } catch (error) {
    return;
  }

  next();
});

export default router;
