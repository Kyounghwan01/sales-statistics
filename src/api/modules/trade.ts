import axios from 'axios';

const BASE_URL = 'https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/board';

export default {
  getTrade: async (id: string) => {
    const res = await axios.get(`${BASE_URL}/${id}`);
    return res.data.order_history;
  },

  createTrade: async (id: string, data: object) => axios.get(`${BASE_URL}/${id}`, data),

  updateTrade: (id: string, orderHistoryId: string, data: object) =>
    axios.get(`${BASE_URL}/${id}?order_history_id=${orderHistoryId}`, data),

  deleteTrade: (id: string, orderHistoryId: string) =>
    axios.get(`${BASE_URL}/${id}?order_history_id=${orderHistoryId}`),
};
