import moment from 'moment';
import _ from 'lodash';
import api from '@/api';

const DEFAULT_SALES = {
  searchType: 'month',
  searchRange: {
    month: [],
    week: [],
  },
  salesData: [],
  currentDateSalesData: [],
};

export const state = {
  sales: {
    ...DEFAULT_SALES,
  },
  loading: false,
};

export const getters = {
  sales: state => state.sales,
  loading: state => state.loading,
};

export const mutations = {
  SET_LOADING(state, data) {
    state.loading = data;
  },

  SET_SALES_FILTER(state, data) {
    const { filter, reset = false } = data;
    const originalFilterValues = !reset ? state.filter : DEFAULT_SALES;
    state.sales = {
      ...originalFilterValues,
      filter,
    };
  },

  SET_SALES_DATA(state, data) {
    state.sales = { ...state.sales, ...data };
  },

  SET_SEARCH_RANGE(state, data) {
    state.sales.searchRange = _.cloneDeep(DEFAULT_SALES.searchRange);

    if (state.sales.searchType === 'month') {
      for (let i = 4; i >= 0; i--) {
        const start = moment(data)
          .subtract(i, 'month')
          .date(1)
          .format('YYYYMMDD');
        let end = moment(data)
          .date(1)
          .subtract(i - 1, 'month')
          .subtract(1, 'day')
          .format('YYYYMMDD');
        if (i === 0) {
          end = moment(data)
            .date(1)
            .add(1, 'month')
            .subtract(1, 'day')
            .format('YYYYMMDD');
        }

        state.sales.searchRange[state.sales.searchType].push({
          start,
          end,
        });
      }
    } else {
      for (let i = 4; i >= 0; i--) {
        const start = moment(data)
          .subtract(i * 7, 'day')
          .day(0)
          .format('YYYYMMDD');
        const end = moment(data)
          .subtract(i * 7, 'day')
          .day(6)
          .format('YYYYMMDD');

        state.sales.searchRange[state.sales.searchType].push({
          start,
          end,
        });
      }
    }
  },
};

export const actions = {
  async getSalesData({ state, commit }, date) {
    try {
      commit('SET_LOADING', true);
      commit('SET_SEARCH_RANGE', date.date);

      const res = await Promise.all(
        state.sales.searchRange[state.sales.searchType].map(el => api.order.getOrderAllForSales(date.id, el)),
      );
      res.sort(function(prev, next) {
        return prev.data.params.date.$gte - next.data.params.date.$gte;
      });

      commit('SET_SALES_DATA', {
        salesData: res.map(el => el.data.order),
        currentDateSalesData: res.filter((el, index) => index === res.length - 1).map(el => el.data.order),
      });
    } catch (error) {
      commit('SET_SALES_DATA', _.cloneDeep(DEFAULT_SALES));
    } finally {
      commit('SET_LOADING', false);
    }
  },

  async getSalesDataWithChangeType({ commit, dispatch }, data) {
    commit('SET_SALES_DATA', data);
    dispatch('getSalesData', data);
  },
};
