import api from '@/api';

export const state = {
  loading: false,
  loginUser: { id: null, name: null, email: null },
};

export const getters = {
  loginUser: state => state.loginUser,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  SET_LOGIN_USER(state, loginUser) {
    state.loginUser = loginUser;
  },
};

export const actions = {
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
};
