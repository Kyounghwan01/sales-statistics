import axios from "axios";

const BASE_URL =
  "https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/board";

export default {
  getUser: () => axios.get(BASE_URL),

  createUser: async (data: object) => {
    return axios.post(BASE_URL, data);
  }
};
