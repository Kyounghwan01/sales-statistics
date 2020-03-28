import axios from "axios";

const BASE_URL =
  "https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/order";

export default {
  getOrderAll: () => {
    return axios.get(BASE_URL);
  },

  getOrderByUser: (id: number, page: number, limit: number) => {
    return axios.get(`${BASE_URL}/${id}?page=${page}&limit=${limit}`);
  },

  getOrderByDate: (startDate: number, endDate: number) => {
    return axios.get(`${BASE_URL}?start_date=${startDate}&end_date=${endDate}`);
  },

  getOrderByUserAndDate: (id: number, startDate: number, endDate: number) => {
    return axios.get(
      `${BASE_URL}/${id}?start_date=${startDate}&end_date=${endDate}`
    );
  },

  createOrder: async (id: number, data: object) => {
    return axios.post(`${BASE_URL}/${id}`, data);
  },

  updateOrder: (id: string, data: object) => {
    return axios.put(`${BASE_URL}/${id}`, data);
  },

  deleteOrder: (id: string) => {
    return axios.delete(`${BASE_URL}/${id}`);
  }
};
