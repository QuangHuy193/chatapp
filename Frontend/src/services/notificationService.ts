import api from "@/lib/axios";
import type { NotificationResponse } from "@/types/store";

const PAGELIMIT = 10;

export const notificationService = {
  fetchNotification: async (cursor?: string): Promise<NotificationResponse> => {
    const res = await api.get(
      `/notifications?limit=${PAGELIMIT}&cursor=${cursor}`,
    );
    return {
      notifications: res.data.notifications,
      cursor: res.data.nextCursor,
    };
  },

  readNotification: async (notiId: string) => {
    const res = await api.patch(`/notifications/read/${notiId}`);
    return res.data;
  },
};
