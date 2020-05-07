import api from '@/api';
import filters from '@/filters';
import store from '@/store';
import moment from 'moment';

export const state = {
  orderLoading: false,
  orders: [],
  orderCopy: [],
  countInComeOutCome: { income: 0, outcome: 0 },
  searchId: null,
  filter: {
    companies: [],
    soldType: '',
    dateSort: '',
    dateRange: [
      moment(new Date())
        .subtract(3, 'months')
        .format('YYYYMMDD'),
      moment(new Date()).format('YYYYMMDD'),
    ],
  },
  pageParams: { page: 0, limit: 15, total: 0 },
};

export const getters = {
  orderLoading: state => state.orderLoading,
  orders: state => state.orders,
  countInComeOutCome: state => state.countInComeOutCome,
  filter: state => state.filter,
  pageParams: state => state.pageParams,
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
    state.filter[Object.keys(data)[0]] = Object.values(data)[0];
  },

  SET_PAGE_PARAMS(state, params) {
    state.pageParams = { ...state.pageParams, ...params };
  },
};

export const actions = {
  async getOrdersByUser({ commit }, params) {
    try {
      commit('SET_ORDER_LOADING', true);
      const res = await api.order.getOrderByUser(params.id, params.page, params.limit);
      commit('SET_FILTER_ORDERS', res.data.order);
      return 'success';
    } catch (error) {
      commit('SET_ORDERS', []);
      commit('SET_ORDER_LOADING', false);
      return 'fail';
    } finally {
      commit('SET_ORDER_LOADING', false);
    }
  },

  async getOrderFilterList({ commit, dispatch }, values) {
    await commit('SET_PAGE_PARAMS', { page: 0 });
    await commit('SET_FILTER', values);
    dispatch('getOrderList');
  },

  async getOrderList({ commit, state }) {
    commit('SET_ORDER_LOADING', true);
    try {
      const companyUid = store.getters['loginUser/loginUser'];
      const res = await api.order.getOrderAll(
        companyUid.id,
        state.pageParams.page,
        state.pageParams.limit,
        state.filter,
      );

      state.pageParams.total = res.data.count;

      let income = 0;
      let outcome = 0;
      res.data.order.map(el => {
        if (el.type) {
          income += el.price;
        } else {
          outcome += el.price;
        }
      });

      commit('SET_COUNT', { income, outcome });
      commit('SET_ORDERS', res.data.order);

      return { message: 'success', count: res.data.count };
    } catch {
      commit('SET_ORDERS', []);
      commit('SET_ORDER_LOADING', false);
      return { message: 'fail', count: null };
    } finally {
      commit('SET_ORDER_LOADING', false);
    }
  },

  //회원 이름으로 주문 찾는 필터 액션

  async filterOrder({ commit, dispatch }, params) {
    if (!params.keyword) {
      /* keyword 없으면 조건 초기화 */
      return commit('SET_ORDERS', state.orderCopy);
    }

    let searchId = null;
    let users = store.getters['users/user'];

    if (!users.length) {
      await store.dispatch('users/getUser');
      users = store.getters['users/user'];
    }

    users.map(el => {
      if (el.name === params.keyword) {
        searchId = el.id;
      }
    });

    state.searchId = searchId;

    if (state.searchId) {
      dispatch('getOrdersByUser', { id: state.searchId, page: 0, limit: 100 });
    } else {
      commit('SET_FILTER_ORDERS', []);
    }
  },
};
