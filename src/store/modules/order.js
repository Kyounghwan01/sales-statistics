import api from "@/api";

export const state = {
  orderLoading: false,

  orders: []

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
  orderLoading: state => state.orderLoading,
  orders: state => state.orders,

  user: state => state.user,
  copyUser: state => state.copyUser,

  currentUser: state => state.currentUser
};

export const mutations = {
  SET_ORDER_LOADING(state, loading) {
    state.orderLoading = loading;
  },

  SET_ORDERS(state, orders) {
    state.orders = orders;
  },

  SET_USER(state, user) {
    state.user = user;
    state.copyUser = user;
  },

  FILTER_USER(state, keyword) {
    state.user = state.copyUser;
    const newArray = state.user.filter(
      userData =>
        userData.name.toLowerCase().includes(keyword) ||
        userData.phone.includes(keyword)
    );
    state.user = newArray;
  },

  SET_CURRENT_USER(state, currentUser) {
    state.currentUser = currentUser;
  }
};

export const actions = {
  async getOrders({ commit }, params) {
    try {
      commit("SET_ORDER_LOADING", true);
      const res = await api.order.getOrderByUser(
        params.id,
        params.page,
        params.limit
      );
      commit("SET_ORDERS", res.order);
      return res;
      //order가 없을때 500에러는 아니고, 그냥 빈배열 날려준다.
    } catch (error) {
      commit("SET_ORDERS", []);
      commit("SET_ORDER_LOADING", false);
    } finally {
      commit("SET_ORDER_LOADING", false);
    }
  },

  async filterUser({ commit }, keyword) {
    commit("FILTER_USER", keyword);
  },

  async getCurrentUser({ commit }, id) {
    try {
      commit("SET_USER_LOADING", true);
      const res = await api.user.getCurrentUser(id);
      commit("SET_CURRENT_USER", res.data);
      return "success";
    } catch (error) {
      commit("SET_CURRENT_USER", {});
      commit("SET_USER_LOADING", false);
      return "fail";
    } finally {
      commit("SET_USER_LOADING", false);
    }
  }
};
