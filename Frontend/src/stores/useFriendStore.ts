import { friendService } from "@/services/FriendService";
import type { FriendState } from "@/types/store";
import { create } from "zustand";

export const useFriendStore = create<FriendState>((set, get) => ({
  loading: false,
  searchUserByUserName: async (userName) => {
    try {
      set({ loading: true });

      const user = await friendService.searchUserByUserName(userName);

      return user;
    } catch (error) {
      console.log("Lỗi xảy ra khi useFriendStore", error);
      return null;
    } finally {
      set({ loading: false });
    }
  },
  sendFriendRequest: async (to, message) => {
    try {
      set({ loading: true });

      const resultMessage = await friendService.sendFriendRequest(to, message);

      return resultMessage;
    } catch (error) {
      console.log("Lỗi xảy ra khi sendFriendRequest", error);
      return "";
    } finally {
      set({ loading: false });
    }
  },
}));
