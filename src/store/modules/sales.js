import moment from "moment";

const DEFAULT_FILTER = {
  rangeType: "month",
  date: moment().format("YYYYMMDD"),
  endDate: moment().format("YYYYMMDD")
};

export const state = {
  filter: {
    ...DEFAULT_FILTER
  },

  rawData: {
    week: {},
    month: {}
  }
};

export const getters = {
  filter: state => state.filter,
  rawData: state => state.rawData
};

export const mutations = {
  SET_FILTER(state, filterOptions) {
    state.filter = !filterOptions
      ? {
          ...DEFAULT_FILTER
        }
      : {
          ...state.filter,
          ...filterOptions
        };
  }
};
