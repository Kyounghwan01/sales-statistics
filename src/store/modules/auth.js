export const state = {
  loginData: {}

  // userTickets: [],
  // userTicketsLoading: false,
  // bookedLectures: [],
  // bookedLecturesLoading: false,
  // memos: [],
  // memosLoading: false,
  // bookingHistory: [],
  // bookingHistoryLoading: false,
  // bookingHistoryCount: {},
  // bookingHistoryTotal: 0,
};

export const getters = {
  loginData: state => state.loginData
};

export const mutations = {
  SET_LOGIN_DATA(state, loginData) {
    state.loginData = loginData;
  }
};

// export const actions = {
//   async getUser({ commit }) {
//     try {
//       commit("SET_USER_LOADING", true);
//       const res = await api.user.getUser();
//       commit("SET_USER", res.data);
//     } catch (error) {
//       commit("SET_USER", []);
//       commit("SET_USER_LOADING", false);
//     } finally {
//       commit("SET_USER_LOADING", false);
//     }
//   }
// };
