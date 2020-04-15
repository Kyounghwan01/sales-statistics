import api from "@/api";
import filters from "@/filters";
import store from "@/store";
// import moment from "moment";

export const state = {
  orderLoading: false,
  orders: [],
  orderCopy: [],
  countInComeOutCome: { income: 0, outcome: 0 },
  searchId: null,
  filter: { companies: [], soldType: "", dateSort: "", dateRange: [] }
};

export const getters = {
  orderLoading: state => state.orderLoading,
  orders: state => state.orders,
  countInComeOutCome: state => state.countInComeOutCome,
  filter: state => state.filter,

  user: state => state.user,
  copyUser: state => state.copyUser,

  currentUser: state => state.currentUser
};

export const mutations = {
  SET_ORDER_LOADING(state, loading) {
    state.orderLoading = loading;
  },

  /** 보여주는 배열, 원본배열 유지 */
  SET_ORDERS(state, orders) {
    state.orders = orders;
    state.orderCopy = orders;
  },

  SET_FILTER_ORDERS(state, orders) {
    state.orders = orders;
  },

  SET_COUNT(state, count) {
    state.countInComeOutCome.income = filters.comma(count.income);
    state.countInComeOutCome.outcome = filters.comma(count.outcome);
  },

  SET_FILTER(state, data) {
    console.log(data);
    state.filter[Object.keys(data)[0]] = Object.values(data)[0];
    console.log(state.filter);
  },

  SET_USER(state, user) {
    state.user = user;
    state.copyUser = user;
  },

  SET_CURRENT_USER(state, currentUser) {
    state.currentUser = currentUser;
  }
};

export const actions = {
  async getOrdersByUser({ commit }, params) {
    try {
      commit("SET_ORDER_LOADING", true);
      const res = await api.order.getOrderByUser(
        params.id,
        params.page,
        params.limit
      );
      commit("SET_FILTER_ORDERS", res.data.order);
      return "success";
    } catch (error) {
      commit("SET_ORDERS", []);
      commit("SET_ORDER_LOADING", false);
      return "fail";
    } finally {
      commit("SET_ORDER_LOADING", false);
    }
  },

  async getOrderList({ commit }, companyUid) {
    commit("SET_ORDER_LOADING", true);
    try {
      const res = await api.order.getOrderAll(companyUid, 0, 50);

      let income = 0;
      let outcome = 0;
      res.data.order.map(el => {
        if (el.type) {
          income += el.price;
        } else {
          outcome += el.price;
        }
      });

      commit("SET_COUNT", { income, outcome });
      commit("SET_ORDERS", res.data.order);

      return "success";
    } catch {
      commit("SET_ORDERS", []);
      commit("SET_ORDER_LOADING", false);
      return "fail";
    } finally {
      commit("SET_ORDER_LOADING", false);
    }
  },

  //필터 액션

  async filterOrder({ commit, dispatch }, params) {
    console.log(params.keyword);
    if (!params.keyword) {
      /* keyword 없으면 조건 초기화 */
      return commit("SET_ORDERS", state.orderCopy);
    }

    let searchId = null;
    let users = store.getters["users/user"];

    if (!users.length) {
      await store.dispatch("users/getUser");
      users = store.getters["users/user"];
    }

    users.map(el => {
      if (el.name === params.keyword) {
        searchId = el.id;
      }
    });

    state.searchId = searchId;

    if (state.searchId) {
      dispatch("getOrdersByUser", { id: state.searchId, page: 0, limit: 100 });
    } else {
      commit("SET_FILTER_ORDERS", []);
    }
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
