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
};
