import { userService } from "@/services/userService";
import type { UserState } from "@/types/store";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";
import { useChatStore } from "./useChatStore";

export const useUserStore = create<UserState>((set, get) => ({
  loadingUpdate: false,
  loadingAvatar: false,
  updatedAvatarUrl: async (formData) => {
    try {
      const { user, setUser } = useAuthStore.getState();
      set({ loadingAvatar: true });
      const data = await userService.uploadAvatar(formData);

      if (user) {
        setUser({
          ...user,
          avatarUrl: data.avatarUrl,
        });

        useChatStore.getState().fetchConversations();
      }

      toast.success("Upload avatar thành công.");
    } catch (error) {
      console.error("Lỗi khi upload avatar", error);
      toast.error("Upload avatar không thành công!");
    } finally {
      set({ loadingAvatar: false });
    }
  },
  updateRankType: async (rankType) => {
    try {
      const { user, setUser } = useAuthStore.getState();
      set({ loadingUpdate: true });
      const data = await userService.updateRankType(rankType);

      if (user) {
        setUser({
          ...user,
          rank: data.rank,
        });
      }

      toast.success("Đã cập nhật loại cấp bậc hiển thị mới.");
    } catch (error) {
      console.error("Lỗi khi upload avatar", error);
      toast.error("Cập nhật loại cấp bậc hiển thị không thành công!");
    } finally {
      set({ loadingUpdate: false });
    }
  },
}));
