import api from "@/lib/axios";

export const friendService = {
  async searchUserByUserName(userName: string) {
    const res = await api.get(`/users/search?userName=${userName}`);

    return res.data.user;
  },

  async sendFriendRequest(to: string, message?: string) {
    const res = await api.post(`/friends/request`, {
      to,
      message,
    });

    return res.data.message || "";
  },

  async getAllFriendRequest() {
    const res = await api.get(`/friends/requests`);
    const { send, received } = res.data;
    return { send, received };
  },

  async acceptRequest(requestId: string) {
    const res = await api.post(`/friends/request/${requestId}/accept`);
    return res.data.newFriend
  },

  async declineRequest(requestId: string) {
    const res = await api.post(`/friends/request/${requestId}/decline`);
    return res.data.message
  },
};
