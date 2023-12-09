import axiosClient from "./axiosClient";

const CheckoutAPI = {
  postEmail: (query) => {
    const url = `/client/order/sendMail${query}`;
    return axiosClient.post(url);
  },

  postOrder: (data) => {
    const url = `/client/order/add`;
    return axiosClient.post(url, { data });
  },
};

export default CheckoutAPI;
