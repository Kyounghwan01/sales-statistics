import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Element from 'element-ui';
import Vuelidate from 'vuelidate';
import moment from 'moment';
import api from './api';
import utils from './utils';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/ko';
import firebase from 'firebase/app';
import filters from '@/filters';
import constant from '@/constant';

moment.locale('ko');
Vue.use(Element, { locale });
Vue.use(Vuelidate);

const firebaseConfig = {
  apiKey: 'AIzaSyBC7gyEeahwratDj8pMkYNsKPuZPe5Ezpg',
  authDomain: 'sales-account.firebaseapp.com',
  databaseURL: 'https://sales-account.firebaseio.com',
  projectId: 'sales-account',
  storageBucket: 'sales-account.appspot.com',
  messagingSenderId: '442089712882',
  appId: '1:442089712882:web:c5c9859f9ecc664322746b',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;
Vue.prototype.moment = moment;
Vue.prototype.$filters = filters;
Vue.prototype.$constant = constant;

let app: object;

firebase.auth().onAuthStateChanged(async user => {
  if (user) {
    const res = await api.loginUser.getLoginUser(user);
    store.dispatch('loginUser/setUser', res.data);
  }
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount('#app');
  }
});
