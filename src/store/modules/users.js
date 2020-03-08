import api from "@/api";

export const state = {
  userLoading: false,

  user: []

  // userTickets: [],
  // userTicketsLoading: false,
  // bookedLectures: [],
  // bookedLecturesLoading: false,
  // memos: [],
  // memosLoading: false,
  // bookingHistory: [],
  // bookingHistoryLoading: false,
  // bookingHistoryCount: {},
  // bookingHistoryTotal: 0,
};

export const getters = {
  userLoading: state => state.userLoading,

  user: state => state.user
};

export const mutations = {
  SET_USER_LOADING(state, loading) {
    state.userLoading = loading;
  },

  SET_USER(state, user) {
    console.log(user);
    state.user = user;
  }
};

export const actions = {
  async getUser({ commit }) {
    try {
      commit("SET_USER_LOADING", true);
      const res = await api.user.getUser();
      console.log(res);
      commit("SET_USER", res.data);
    } catch (error) {
      commit("SET_USER", []);
      commit("SET_USER_LOADING", false);
    } finally {
      commit("SET_USER_LOADING", false);
    }
  }
};
