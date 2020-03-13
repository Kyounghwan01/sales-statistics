import axios from "axios";

const BASE_URL =
  "https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/board";

export default {
  getUser: () => axios.get(BASE_URL),

  getCurrentUser: (id: string) => axios.get(`${BASE_URL}/${id}`),

  createUser: async (data: object) => {
    return axios.post(BASE_URL, data);
  },

  updateUser: async (data: object, id: number) => {
    return axios.put(`${BASE_URL}/${id}`, data);
  },

  deleteUser: async (id: number) => {
    return axios.delete(`${BASE_URL}/${id}`);
  }
};
