import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://zemogabookclub-test.click",
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Methods": "GET,POST,PATCH,DELETE",
  },
  mode: "no-cors",
});

export default {
  async getBookProfile(id) {
    try {
      const response = await apiClient.get(`/clubs/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  },

  async getParticipantsCount(id) {
    try {
      const response = await apiClient.get(`/clubs/${id}/users`);
      return response.data.count;
    } catch (error) {
      console.error(error);
    }
  },

  proposeBook(bookInfo) {
    return apiClient.post("/clubs/club", bookInfo);
  },
  getProposedBooks(number) {
    return apiClient.get(`/clubs?status=Proposed&amount=${number}`);
  },
  getActiveBooks(number) {
    return apiClient.get(`/clubs?status=Active&amount=${number}`);
  },
  async getMembersList(id) {
    try {
      const response = await apiClient.get(`/clubs/${id}/users`);
      return response.data.usersInClub;
    } catch (error) {
      console.error(error);
    }
  },
  joinClub(userId, clubId, members) {
    return apiClient.patch(
      `/users/${userId}/clubs/${clubId}/join?members=${members}`
    );
  },
  leaveClub(userId, clubId) {
    return apiClient.patch(`/users/${userId}/clubs/${clubId}/unjoin?`);
  },
  signUpUser(userInfo) {
    return apiClient.post("/users/user/signup", userInfo);
  },
  logInUser(userInfo) {
    return apiClient.post("/users/user/login", userInfo);
  },

  async checkUserSesion() {
    try {
      const response = await apiClient.get("/users/user/checkSession");
      return response.data.currentUser;
    } catch (error) {
      console.error(error);
    }
  },
  async isUserInClub(clubId) {
    try {
      const response = await apiClient.get(`/clubs/${clubId}/users`);
      return response.data.usersInClub;
    } catch (error) {
      console.error(error);
    }
  },
};
