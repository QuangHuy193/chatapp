import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { authState } from "@/types/store";

export const useAuthStore = create<authState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,
  signUp: async (userName, firstName, lastName, email, password) => {
    try {
      // gọi api
      await authService.signUp(userName, password, email, firstName, lastName);
      set({ loading: true });
      toast.success(
        "Đăng ký thành công! Bạn sẽ được chuyển qua trang đăng nhập.",
      );
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Đăng ký không thành công!");
      return false;
    } finally {
      set({ loading: false });
    }
  },
}));
