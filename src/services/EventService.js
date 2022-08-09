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
  getBookProfile(id) {
    return apiClient.get(`clubs/club?id=${id}`);
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
};
