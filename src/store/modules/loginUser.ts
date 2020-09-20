import api from '@/api';
import { Module } from 'vuex';
import { RootState } from '@/store/index.ts';

interface LoginUser {
  id: null | string;
  name: null | string;
  email: null | string;
}
interface LoginUserInter {
  loading: boolean;
  loginUser: LoginUser;
}

const module: Module<LoginUserInter, RootState> = {
  namespaced: true,
  state: {
    loading: false,
    loginUser: { id: null, name: null, email: null },
  },

  getters: {
    loginUser: state => state.loginUser,
  },

  mutations: {
    SET_LOADING(state, loading: boolean) {
      state.loading = loading;
    },

    SET_LOGIN_USER(state, loginUser: LoginUser) {
      state.loginUser = loginUser;
    },
  },

  actions: {
    async setUser({ commit }, data) {
      try {
        commit('SET_LOADING', true);
        commit('SET_LOGIN_USER', data);
        return 'success';
      } catch (error) {
        commit('SET_LOGIN_USER', {});
        commit('SET_LOADING', false);
        return 'fail';
      } finally {
        commit('SET_LOADING', false);
      }
    },

    logOutUser({ commit }) {
      commit('SET_LOADING', true);
      commit('SET_LOGIN_USER', {});
      commit('SET_LOADING', false);
      return 'success';
    },

    async filterUser({ commit }, keyword) {
      commit('FILTER_USER', keyword);
    },

    async getCurrentUser({ commit }, id) {
      try {
        commit('SET_USER_LOADING', true);
        const res = await api.user.getCurrentUser(id);
        commit('SET_CURRENT_USER', res.data);
        return 'success';
      } catch (error) {
        commit('SET_CURRENT_USER', {});
        commit('SET_USER_LOADING', false);
        return 'fail';
      } finally {
        commit('SET_USER_LOADING', false);
      }
    },
  },
};

export default module;
