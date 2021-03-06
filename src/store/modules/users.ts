import { Module } from 'vuex';
import api from '@/api';
import { RootState } from '@/store/index.ts';

export interface User {
  id: number;
  companyUid: string;
  name: string;
  phone: string;
  registreDate: string;
  content: string;
  address: string;
}

interface UsersInter {
  userLoading: boolean;
  user: User[];
  copyUser: User[];
  currentUser: object;
}

const module: Module<UsersInter, RootState> = {
  namespaced: true,
  state: {
    userLoading: false,
    user: [],
    copyUser: [],
    currentUser: {},
  },

  getters: {
    userLoading: state => state.userLoading,
    user: state => state.user,
    copyUser: state => state.copyUser,
    currentUser: state => state.currentUser,
  },

  mutations: {
    SET_USER_LOADING(state, loading) {
      state.userLoading = loading;
    },

    SET_USER(state, user) {
      state.user = user;
      state.copyUser = user;
    },

    FILTER_USER(state, keyword) {
      state.user = state.copyUser;
      const newArray = state.user.filter(
        userData => userData.name.toLowerCase().includes(keyword) || userData.phone.includes(keyword),
      );
      state.user = newArray;
    },

    SET_CURRENT_USER(state, currentUser) {
      state.currentUser = currentUser;
    },
  },

  actions: {
    async getUser({ commit }, id) {
      try {
        commit('SET_USER_LOADING', true);
        const res = await api.user.getUser(id);
        commit('SET_USER', res.data);
      } catch (error) {
        commit('SET_USER', []);
        commit('SET_USER_LOADING', false);
      } finally {
        commit('SET_USER_LOADING', false);
      }
    },

    async filterUser({ commit }, keyword) {
      commit('FILTER_USER', keyword);
    },

    async getCurrentUser({ commit }, params) {
      try {
        commit('SET_USER_LOADING', true);
        const res = await api.user.getCurrentUser(params.companyUid, params.id);
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
