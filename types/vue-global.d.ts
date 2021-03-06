// 지우면 vue-chart.js name error 지우지 말것
import Vue from 'vue';

// api 파일들에 대해 interface를 정의하는 부분입니다.
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
  getOrderForExcel: Function;
}

interface user {
  getUser: Function;
  createUser: Function;
  getCurrentUser: Function;
  editLoginUser: Function;
  updateUser: Function;
  deleteUser: Function;
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
  excel: excel;
  validate: validate;
}

interface excel {
  excelDownload: Function;
  formatJSON: Function;
}

interface validate {
  checkAlertMessage: Function;
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

// 이곳이 가장 중요한 곳입니다. 정의한 모듈을 전역으로 쓰기 위해 타입 지정하는 곳
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
    $constant: constant;
  }
}

declare module 'chart.js';
declare module 'vue-chartjs';
