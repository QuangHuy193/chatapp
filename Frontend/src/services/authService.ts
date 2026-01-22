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
        password,
        email,
        firstName,
        lastName,
      },
      { withCredentials: true },
    );
    return res.data;
  },
};
