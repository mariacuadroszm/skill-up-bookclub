import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://184.73.114.18:3100",
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET, POST,PATCH",
  },
  mode: "no-cors",
});

export default {
  async getBookProfile(id) {
    try {
      const response = await apiClient.get(`clubs/club?id=${id}`);
      return response.data.book;
    } catch (error) {
      console.error(error);
    }
  },

  async getParticipantsCount(id) {
    try {
      const response = await apiClient.get(`/clubs/club/users?id=${id}`);
      return response.data.count;
    } catch (error) {
      console.error(error);
    }
  },

  proposeBook(bookInfo) {
    return apiClient.post("/clubs/club", bookInfo);
  },
  getProposedBooks(number) {
    return apiClient.get(`clubs?status=Proposed&amount=${number}`);
  },
  getActiveBooks(number) {
    return apiClient.get(`clubs?status=Active&amount=${number}`);
  },

  joinClub(userId, clubId) {
    return apiClient.patch(
      `/users/user/club/join?id=${userId}&clubId=${clubId}`
    );
  },
  unjoinClub(userId, clubId) {
    return apiClient.patch(
      `/users/user/club/unjoin?id=${userId}&clubId=${clubId}`
    );
  },
};
