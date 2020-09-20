import { Module } from 'vuex';
import { RootState } from '@/store/index.ts';

interface EditOrder {
  orderData: {
    type: boolean;
    date: string | null;
    price: number | null;
    memo: string | null;
    goods: string | null;
    unitPrice: number | null;
    count: number | null;
    outstanding: number;
  };
}

const DEFAULT_ORDERDATA = {
  type: true,
  date: null,
  price: null,
  memo: null,
  goods: null,
  unitPrice: null,
  count: null,
  outstanding: 0,
};

const module: Module<EditOrder, RootState> = {
  namespaced: true,
  state: {
    orderData: { ...DEFAULT_ORDERDATA },
  },

  getters: {
    orderData: state => state.orderData,
  },

  mutations: {
    SET_CREATE_ORDER_DATA(state, orderData) {
      state.orderData = orderData;
    },
    SET_RESET_ORDER_DATA(state) {
      state.orderData = { ...DEFAULT_ORDERDATA };
    },
  },
};

export default module;
