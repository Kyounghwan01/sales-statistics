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

//api 는 나누지 않고 호출
//api 호출한 범위, rangetype을 배열에 넣고, 사용자가 기간 클릭한 범위안에 있으면 그 기간 호출 안함
