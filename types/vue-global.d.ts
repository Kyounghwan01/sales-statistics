//지우면 vue-chart.js name error 지우지 말것
import Vue from 'vue';

//api파일들에 대해 interface를 정의하는 부분입니다.
interface firebase {
  getData: Function;
}

//api파일들에 대해 interface를 정의하는 부분입니다.
interface order {
  getOrderAll: Function;
  getOrderByUser: Function;
  getOrderByDate: Function;
  getOrderByUserAndDate: Function;
  createOrder: Function;
  updateOrder: Function;
  deleteOrder: Function;
}

interface user {
  getUser: Function;
  createUser: Function;
  getCurrentUser: Function;
  editLoginUser: Function;
  updateUser: Function;
}

interface loginUser {
  getUserAll: Function;
  getLoginUser: Function;
  createLoginUser: Function;
  editLoginUser: Function;
  deleteLoginUser: Function;
}

interface apis {
  firebase: firebase;
  user: user;
  order: order;
  loginUser: loginUser;
}

interface utils {
  excel: Function;
  validate: Function;
}

interface filters {
  comma: Function;
  date: Function;
  mobile: Function;
}

interface constant {
  colorSet: string[];
  inComeColor: string;
  outComeColor: string;
  profitColor: string;
  lineChartColorSet: string[];
}

//이곳이 가장 중요한 곳입니다.
declare module 'vue/types/vue' {
  interface Vue {
    $api: apis;
  }
  interface Vue {
    $utils: utils;
  }
  interface Vue {
    $filters: filters;
  }
  interface Vue {
    $filters: filters;
  }
  interface Vue {
    $constant: constant;
  }
}

declare module 'chart.js';
declare module 'vue-chartjs';
