import Vue from 'vue'

//api파일들에 대해 interface를 정의하는 부분입니다.
interface firebase {
  getData: Function
}

interface user {
  getUser: Function,
  createUser: Function,
  getCurrentUser: Function,
  updateUser: Function
}

interface apis {
  firebase: firebase,
  user: user
}

//이곳이 가장 중요한 곳입니다.
declare module 'vue/types/vue' {
  interface Vue {
    $api: apis
  }
}