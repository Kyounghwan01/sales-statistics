export const state = {
  orderData: {
    type: true,
    date: null,
    price: null,
    memo: null,
    goods: null,
    unitPrice: null,
    count: null,
    outstanding: 0
  }
};

export const getters = {
  orderData: state => state.orderData,
};

export const mutations = {
  SET_CREATE_ORDER_DATA(state, orderData) {
    state.orderData = orderData;
  }
};
