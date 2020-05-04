import axios from 'axios';

const BASE_URL = 'https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/order';

export default {
  getOrderAll: (
    companyUid: string,
    page: number,
    limit: number,
    filters: {
      dateRange: string[];
      companies: string | number[];
      soldType: boolean;
      dateSort: number;
    },
  ) => {
    let url = `${BASE_URL}?companyUid=${companyUid}&page=${page}&limit=${limit}&start_date=${filters.dateRange[0]}&end_date=${filters.dateRange[1]}`;
    if (filters) {
      if (filters.companies.length) {
        const companies = JSON.stringify(filters.companies);
        url += `&companies=${companies}`;
      }
      if (filters.soldType || filters.soldType === false) {
        url += `&type=${filters.soldType}`;
      }
      if (filters.dateSort) {
        url += `&past=${filters.dateSort}`;
      }
    }
    return axios.get(url);
  },

  getOrderByUser: (id: number, page: number, limit: number) => {
    return axios.get(`${BASE_URL}/${id}?page=${page}&limit=${limit}`);
  },

  getOrderByDate: (startDate: number, endDate: number) => {
    return axios.get(`${BASE_URL}?start_date=${startDate}&end_date=${endDate}`);
  },

  getOrderByUserAndDate: (id: number, startDate: number, endDate: number) => {
    return axios.get(`${BASE_URL}/${id}?start_date=${startDate}&end_date=${endDate}`);
  },

  createOrder: async (id: number, data: object) => {
    return axios.post(`${BASE_URL}/${id}`, data);
  },

  updateOrder: (orderId: string, data: object) => {
    return axios.put(`${BASE_URL}/${orderId}`, data);
  },

  deleteOrder: (orderId: string) => {
    return axios.delete(`${BASE_URL}/${orderId}`);
  },

  getOrderAllForSales: (
    companyUid: string,
    params: {
      start: string;
      end: string;
    },
  ) => {
    return axios.get(`${BASE_URL}?companyUid=${companyUid}&start_date=${params.start}&end_date=${params.end}`);
  },

  getOrderForExcel: (companyUid: string) => axios.get(`${BASE_URL}?companyUid=${companyUid}`),
};
