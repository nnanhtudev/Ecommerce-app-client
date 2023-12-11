import axiosClient from "./axiosClient";

const ChatRoomsAPI = {
  getMessageByRoomId: (roomId) => {
    const url = `/chat/getById?roomId=${roomId}`;
    return axiosClient.get(url);
  },

  createNewRoom: () => {
    const url = `/chat/createNewRoom`;
    return axiosClient.post(url);
  },

  addMessage: (body) => {
    const url = `/chat/addMessage`;
    return axiosClient.put(url, body);
  },
};

export default ChatRoomsAPI;
