import { Module } from 'vuex';
import { RootState } from '@/store/index.ts';
import moment from 'moment';
import _ from 'lodash';
import api from '@/api';

interface SalesInter {
  sales: {
    searchType: string;
    searchRange: Record<string, { start: string; end: string }[]>;
    salesData: string[];
    currentDateSalesData: string[];
  };
  loading: boolean;
}

interface ResType {
  data: {
    params: {
      date: {
        $gte: number;
      };
    };
  };
}

const DEFAULT_SALES = {
  searchType: 'month',
  searchRange: {
    month: [],
    week: [],
  },
  salesData: [],
  currentDateSalesData: [],
};

const module: Module<SalesInter, RootState> = {
  namespaced: true,
  state: {
    sales: { ...DEFAULT_SALES },
    loading: false,
  },

  getters: {
    sales: state => state.sales,
    loading: state => state.loading,
  },

  mutations: {
    SET_LOADING(state, data) {
      state.loading = data;
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
      } else if (state.sales.searchType === 'week') {
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
  },

  actions: {
    async getSalesData({ state, commit }, date) {
      try {
        commit('SET_LOADING', true);
        commit('SET_SEARCH_RANGE', date.date);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const res: any = await Promise.all(
          state.sales.searchRange[state.sales.searchType].map((el: object) =>
            api.order.getOrderAllForSales(date.id, el),
          ),
        );

        res.sort(function(prev: ResType, next: ResType) {
          return prev.data.params.date.$gte - next.data.params.date.$gte;
        });

        commit('SET_SALES_DATA', {
          salesData: res.map((el: { data: { order: object } }) => el.data.order),
          currentDateSalesData: res
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .filter((el: any, index: number) => index === res.length - 1)
            .map((el: { data: { order: object } }) => el.data.order),
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
  },
};
export default module;
