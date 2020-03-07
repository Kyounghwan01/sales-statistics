import api from "@/api";

export const state = {
  memberLoading: false,

  member: {},

  membersArray: []
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
  memberLoading: state => state.memberLoading,

  member: state => state.member
};

export const mutations = {
  SET_MEMBER_LOADING(state, loading) {
    state.memberLoading = loading;
  },

  SET_MEMBER(state, member) {
    state.member = member;
  }
};

export const actions = {
  async getMember({ commit }) {
    try {
      commit("SET_MEMBER_LOADING", true);
      api.firebase
        .getMember()
        .once("value")
        .then(data => {
          const members = [];
          const obj = data.val();
          for (const key in obj) {
            members.push({
              id: key,
              name: obj[key].name,
              registeredAt: obj[key].registeredAt,
              phone: obj[key].phone,
              address: obj[key].address
            });
          }
          commit("SET_MEMBER", members);
          commit("SET_MEMBER_LOADING", false);
        });
    } catch (error) {
      commit("SET_MEMBER", {});
      commit("SET_MEMBER_LOADING", false);
    } finally {
      commit("SET_MEMBER_LOADING", false);
    }
  }
};
