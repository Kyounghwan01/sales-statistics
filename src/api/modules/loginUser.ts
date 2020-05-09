import axios from 'axios';

const BASE_URL = 'https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/user';

export default {
  getUserAll: () => {
    return axios.get(BASE_URL);
  },

  getLoginUser: (id: string) => {
    return axios.get(`${BASE_URL}/${id}`);
  },

  createLoginUser: (data: object) => {
    return axios.post(BASE_URL, data);
  },

  editLoginUser: (id: string, data: object) => {
    return axios.put(`${BASE_URL}/${id}`, data);
  },

  deleteLoginUser: (id: string) => {
    return axios.delete(`${BASE_URL}/${id}`);
  },
};
