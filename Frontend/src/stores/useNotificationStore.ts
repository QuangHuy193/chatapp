import { notificationService } from "@/services/notificationService";
import type { NotificationState } from "@/types/store";
import { create } from "zustand";

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  cursor: "",
  loading: false,
  fetchNotification: async () => {
    try {
      set({ loading: true });

      const data = await notificationService.fetchNotification(get().cursor);

      set({ notifications: data.notifications, cursor: data.cursor });
    } catch (error) {
      console.error(error);
    } finally {
      set({ loading: false });
    }
  },

  readNotification: async (notiId) => {
    try {
      await notificationService.readNotification(notiId);
      set((state) => ({
        notifications: state.notifications.map((noti) =>
          noti._id === notiId ? { ...noti, isRead: true } : noti,
        ),
      }));
    } catch (error) {
      console.error(error);
    }
  },
}));
