import { Module } from 'vuex';
import { RootState } from '@/store/index.ts';

interface AuthInter {
  loginData: object;
}

const module: Module<AuthInter, RootState> = {
  namespaced: true,
  state: {
    loginData: {},
  },

  getters: {
    loginData: state => state.loginData,
  },

  mutations: {
    SET_LOGIN_DATA(state, loginData) {
      state.loginData = loginData;
    },
  },
};

export default module;
