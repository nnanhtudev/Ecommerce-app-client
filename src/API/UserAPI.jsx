import axiosClient from "./axiosClient";

const UserAPI = {
  getAllData: () => {
    const url = "/users";
    return axiosClient.get(url);
  },

  getDetailData: (id) => {
    const url = `/users/${id}`;
    return axiosClient.get(url);
  },

  postSignUp: (query) => {
    const url = `/users/signup/${query}`;
    return axiosClient.post(url);
  },

  // fix

  getAccount: () => {
    const url = "/client/user/account";
    return axiosClient.get(url);
  },

  postSignUpUser: (data) => {
    const url = `/client/user/register`;
    return axiosClient.post(url, { data: data });
  },

  postSignInUser: (data) => {
    const url = `/client/user/login`;
    return axiosClient.post(url, { data: data });
  },

  postLogoutUser: () => {
    const url = `/client/user/logout`;
    return axiosClient.post(url);
  },
};

export default UserAPI;
