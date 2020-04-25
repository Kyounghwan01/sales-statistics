import moment from "moment";

const DEFAULT_SALES = {
  searchType: "month",
  searchRange: {
    month: [],
    week: []
  },
  salesDate: { month: [], week: [] },
  BaseDate: moment().format("YYYYMMDD")
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
    state.sales.salesDate = data;
  },

  SET_SEARCH_RANGE(state, data) {
    if (state.sales.searchType === "month") {
      console.log("ASd");
    } else {
      console.log("zxc");
    }
    state.selas.searchRange = data;
  }
};

export const actions = {
  async getSalesData({ state, commit }) {
    try {
      commit("SET_SALES_DATA", true);
      commit("SET_SEARCH_RANGE", state.BaseDate);
      //state.sales.searchRange 배열만큼 api 호출
    } catch (error) {
      commit("SET_SALES_DATA", null);
    } finally {
      commit("SET_SALES_DATA", false);
    }
  }
};

//api 는 나누지 않고 호출
//api 호출한 범위, rangetype을 배열에 넣고, 사용자가 기간 클릭한 범위안에 있으면 그 기간 호출 안함

// {
//   start: moment(new Date())
//     .subtract(3, "months")
//     .date(1)
//     .format("YYYYMMDD"),
//   end: moment(new Date())
//     .date(1)
//     .subtract(2, "month")
//     .subtract(1, "day")
//     .format("YYYYMMDD")
// },
// {
//   start: moment(new Date())
//     .subtract(2, "month")
//     .date(1)
//     .format("YYYYMMDD"),
//   end: moment(new Date())
//     .date(1)
//     .subtract(1, "month")
//     .subtract(1, "day")
//     .format("YYYYMMDD")
// },
// {
//   start: moment(new Date())
//     .subtract(1, "month")
//     .date(1)
//     .format("YYYYMMDD"),
//   end: moment(new Date())
//     .date(1)
//     .subtract(1, "day")
//     .format("YYYYMMDD")
// },
// {
//   start: moment(new Date())
//     .date(1)
//     .format("YYYYMMDD"),
//   end: moment(new Date()).format("YYYYMMDD")
// }
