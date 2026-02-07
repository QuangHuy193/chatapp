import api from "@/lib/axios";

export const authService = {
  signUp: async (
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => {
    const res = await api.post(
      `/auth/signup`,
      {
        userName,
        firstName,
        lastName,
        email,
        password,
      },
      { withCredentials: true },
    );
    return res.data;
  },

  signIn: async (userName: string, password: string) => {
    const res = await api.post(
      `/auth/signin`,
      { userName, password },
      { withCredentials: true },
    );
    return res.data;
  },

  signOut: async () => {
    await api.post(`/auth/signout`, {}, { withCredentials: true });
  },

  fetchMe: async () => {
    const res = await api.get(`/users/me`, { withCredentials: true });

    return res.data.user;
  },

  refreshToken: async () => {
    const res = await api.post("/auth/refresh", { withCredentials: true, });
    return res.data.accessToken;
  },
};
