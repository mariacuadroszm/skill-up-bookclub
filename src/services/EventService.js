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
  getBookProfile() {
    return apiClient.get(`clubs/club?id=b2073cce-5afc-4709-9e28-6129f265a3be`);
  },
  proposeBook(bookInfo) {
    return apiClient.post("/clubs/club", bookInfo);
  },
};
