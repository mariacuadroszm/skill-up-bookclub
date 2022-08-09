import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://184.73.114.18:3100",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  mode: "no-cors",
});

export default {
  async getBookProfile(id) {
    const response = await apiClient.get(`clubs/club?id=${id}`);
    return response.data.book;
  },

  async getParticipantsCount(id) {
    const response = await apiClient.get(`/clubs/club/users?id=${id}`);
    return response.data.count;
  },

  proposeBook(bookInfo) {
    return apiClient.post("/clubs/club", bookInfo);
  },
};
