import axiosClient from "./axiosClient";

const HistoryAPI = {
  getHistoryAPI: (query) => {
    const url = `/client/order/histories${query}`;
    return axiosClient.get(url);
  },

  getDetail: (id) => {
    const url = `/client/order/histories/${id}`;
    return axiosClient.get(url);
  },
};

export default HistoryAPI;
