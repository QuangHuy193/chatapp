import { userService } from "@/services/userService";
import type { UserState } from "@/types/store";
import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { toast } from "sonner";
import { useChatStore } from "./useChatStore";
import { authService } from "@/services/authService";
import axios from "axios";

export const useUserStore = create<UserState>((set, get) => ({
  loadingUpdate: false,
  loadingAvatar: false,
  updatedAvatarUrl: async (formData) => {
    try {
      set({ loadingAvatar: true });
      const { user, setUser } = useAuthStore.getState();
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

  updateInfo: async (data) => {
    try {
      set({ loadingUpdate: true });
      const { user, setUser } = useAuthStore.getState();

      const newUser = await userService.updateInfo(data);

      if (user) {
        setUser({
          ...user,
          ...newUser,
        });
      }
      toast.success("Cập nhật thông tin thành công.");
    } catch (error) {
      console.error("Lỗi khi cập nhật thông tin", error);
      toast.error("Cập nhật thông tin không thành công!");
    } finally {
      set({ loadingUpdate: false });
    }
  },

  changePass: async (oldPass, newPass) => {
    try {
      set({ loadingUpdate: true });

      await userService.changePass(oldPass, newPass);

      await authService.signOut();

      toast.success("Cập nhật mật khẩu thành công. Vui lòng đăng nhập lại");

      return true;
    } catch (error) {
      console.error("Lỗi khi cập nhật mật khẩu", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message ||
            "Cập nhật mật khẩu không thành công!",
        );
      } else {
        toast.error("Cập nhật mật khẩu không thành công!");
      }
      return false;
    } finally {
      set({ loadingUpdate: false });
    }
  },

  deleteAccount: async () => {
    try {
      set({ loadingUpdate: true });

      await userService.deleteAccount();

      await authService.signOut();

      toast.success("Tài khoản đã được xóa thành công");

      return true;
    } catch (error) {
      console.error("Lỗi khi xóa tài khoản", error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Xóa tài khoản không thành công!",
        );
      } else {
        toast.error("Xóa tài khoản không thành công!");
      }
      return false;
    } finally {
      set({ loadingUpdate: false });
    }
  },
}));
