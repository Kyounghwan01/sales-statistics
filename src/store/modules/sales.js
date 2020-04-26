import moment from "moment";
import _ from "lodash";
import api from "@/api";

const DEFAULT_SALES = {
  searchType: "month",
  searchRange: {
    month: [],
    week: []
  },
  salesData: { month: [], week: [] }
};

export const state = {
  sales: {
    ...DEFAULT_SALES
  },
  loading: false
};

export const getters = {
  sales: state => state.sales
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
      filter
    };
  },

  SET_SALES_DATA(state, data) {
    state.sales = { ...state.sales, ...data };
    // console.log(state.sales);
  },

  SET_SEARCH_RANGE(state, data) {
    state.sales.searchRange = _.cloneDeep(DEFAULT_SALES.salesData);

    if (state.sales.searchType === "month") {
      for (let i = 4; i >= 0; i--) {
        const start = moment(data)
          .subtract(i, "month")
          .date(1)
          .format("YYYYMMDD");
        let end = moment(data)
          .date(1)
          .subtract(i - 1, "month")
          .subtract(1, "day")
          .format("YYYYMMDD");
        if (i === 0) {
          end = moment(data)
            .date(1)
            .add(1, "month")
            .subtract(1, "day")
            .format("YYYYMMDD");
        }

        state.sales.searchRange[state.sales.searchType].push({
          start,
          end
        });
      }
    } else {
      for (let i = 4; i >= 0; i--) {
        const start = moment(data)
          .subtract(i * 7, "day")
          .day(0)
          .format("YYYYMMDD");
        const end = moment(data)
          .subtract(i * 7, "day")
          .day(6)
          .format("YYYYMMDD");

        state.sales.searchRange[state.sales.searchType].push({
          start,
          end
        });
      }
      console.log(state.sales.searchRange);
    }
  }
};

export const actions = {
  async getSalesData({ state, commit }, date) {
    // console.log(date);
    try {
      commit("SET_LOADING", true);
      commit("SET_SEARCH_RANGE", date.date);

      const res = await Promise.all(
        state.sales.searchRange[state.sales.searchType].map(el =>
          api.order.getOrderAllForSales(date.id, el)
        )
      );
      console.log(res);

      // commit("SET_SALES_DATA", data);
      //state.sales.searchRange 배열만큼 api 호출
    } catch (error) {
      commit("SET_SALES_DATA", _.cloneDeep(DEFAULT_SALES));
    } finally {
      commit("SET_LOADING", false);
    }
  },

  async getSalesDataWithChangeType({ commit, dispatch }, data) {
    commit("SET_SALES_DATA", data);
    dispatch("getSalesData", data);
  }
};
