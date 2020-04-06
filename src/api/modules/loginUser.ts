import axios from "axios";

const BASE_URL =
  "https://9wnw9kggv9.execute-api.ap-northeast-2.amazonaws.com/2020-03-07/user";

export default {
  getUserAll: () => {
    return axios.get(BASE_URL);
  },

  getLoginUser: (id: string) => {
    return axios.get(`${BASE_URL}/${id}`);
  },

  createLoginUser: (data: object) => {
    return axios.post(BASE_URL, data);
  }
};

// {
// 	"name":"ksh",
// 	"email": "1s23noh23@gmail.com"
// }
