import { create } from "zustand";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { authState } from "@/types/store";
import { persist } from "zustand/middleware";

export const useAuthStore = create<authState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,

      clearState: () => {
        set({
          accessToken: null,
          user: null,
          loading: false,
        });

        localStorage.clear();
      },

      setAccessToken: (accessToken) => {
        set({ accessToken });
      },

      signUp: async (userName, firstName, lastName, email, password) => {
        try {
          set({ loading: true });
          // gọi api
          await authService.signUp(
            userName,
            firstName,
            lastName,
            email,
            password,
          );
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

      signIn: async (userName, password) => {
        try {
          set({ loading: true });

          localStorage.clear();

          const { accessToken } = await authService.signIn(userName, password);

          get().setAccessToken(accessToken);
          // lấy dl người dùng
          await get().fetchMe();

          toast.success("Chào mừng bạn quay lại MyChat 🎉");
          return true;
        } catch (error) {
          console.log(error);
          toast.error("Đăng nhập không thành công!");
          return false;
        } finally {
          set({ loading: false });
        }
      },

      signOut: async () => {
        try {
          get().clearState();
          await authService.signOut();
          toast.success("Đăng xuất thành công");
          return true;
        } catch (error) {
          console.log(error);
          toast.error("Đăng xuất không thành công!");
          return false;
        }
      },

      fetchMe: async () => {
        try {
          set({ loading: true });
          const user = await authService.fetchMe();
          set({ user });
        } catch (error) {
          console.log(error);
          set({ user: null, accessToken: null });
          toast.error("Lỗi xảy ra khi lấy dữ liệu người dùng. Hãy thử lại!");
        } finally {
          set({ loading: false });
        }
      },

      refreshToken: async () => {
        try {
          set({ loading: true });
          const { user, fetchMe } = get();

          const accessToken = await authService.refreshToken();

          get().setAccessToken(accessToken);

          if (!user) {
            await fetchMe();
          }
        } catch (error) {
          console.log(error);
          get().clearState();
          toast.error("Phiên đăng nhập đã hết hạn! Vui lòng đăng nhập lại.");
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({ user: state.user }), // chỉ persist user
    },
  ),
);
