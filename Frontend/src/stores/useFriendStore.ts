import { friendService } from "@/services/FriendService";
import type { FriendState } from "@/types/store";
import { create } from "zustand";

export const useFriendStore = create<FriendState>((set, get) => ({
  loading: false,
  receivedList: [],
  sentList: [],
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
  getAllFriendRequest: async () => {
    try {
      set({ loading: true });

      const result = await friendService.getAllFriendRequest();
      if (!result) return;

      const { send, received } = result;

      set({
        receivedList: received,
        sentList: send,
      });
    } catch (error) {
      console.log("Lỗi xảy ra khi getAllFriendRequest", error);
    } finally {
      set({ loading: false });
    }
  },

  acceptRequest: async (requestId) => {
    try {
      set({ loading: true });

      await friendService.acceptRequest(requestId);

      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== requestId),
      }));
    } catch (error) {
      console.log("Lỗi xảy ra khi acceptRequest", error);
    } finally {
      set({ loading: false });
    }
  },

  declineRequest: async (requestId) => {
    try {
      set({ loading: true });

      await friendService.declineRequest(requestId);

      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== requestId),
      }));
    } catch (error) {
      console.log("Lỗi xảy ra khi declineRequest", error);
    } finally {
      set({ loading: false });
    }
  },
}));
