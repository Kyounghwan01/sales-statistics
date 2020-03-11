import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Element from "element-ui";
import moment from "moment";
import api from "./api";
import "element-ui/lib/theme-chalk/index.css";
import locale from "element-ui/lib/locale/lang/ko";
import firebase from "firebase/app";

moment.locale("ko");
Vue.use(Element, { locale });

const firebaseConfig = {
  apiKey: "AIzaSyBC7gyEeahwratDj8pMkYNsKPuZPe5Ezpg",
  authDomain: "sales-account.firebaseapp.com",
  databaseURL: "https://sales-account.firebaseio.com",
  projectId: "sales-account",
  storageBucket: "sales-account.appspot.com",
  messagingSenderId: "442089712882",
  appId: "1:442089712882:web:c5c9859f9ecc664322746b"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;
Vue.prototype.$api = api;

let app: object;

firebase.auth().onAuthStateChanged(user => {
  console.log(user);
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
