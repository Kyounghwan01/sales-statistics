export const state = {
  loginData: {},
};

export const getters = {
  loginData: state => state.loginData,
};

export const mutations = {
  SET_LOGIN_DATA(state, loginData) {
    state.loginData = loginData;
  },
};
