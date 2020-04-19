import _ from "lodash";

const DEFAULT_ORDERDATA = {
  type: true,
  date: null,
  price: null,
  memo: null,
  goods: null,
  unitPrice: null,
  count: null,
  outstanding: 0
};

export const state = {
  orderData: _.cloneDeep(DEFAULT_ORDERDATA)
};

export const getters = {
  orderData: state => state.orderData
};

export const mutations = {
  SET_CREATE_ORDER_DATA(state, orderData) {
    state.orderData = orderData;
  },
  SET_RESET_ORDER_DATA(state) {
    state.orderData = _.cloneDeep(DEFAULT_ORDERDATA);
  }
};
