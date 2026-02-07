import api from "@/lib/axios";

export const userService = {
  uploadAvatar: async (formData: FormData) => {
    const res = await api.post("/users/uploadAvatar", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (res.status === 404) {
      throw new Error(res.data.message);
    }

    return res.data;
  },

  updateRankType: async (rankType: string) => {
    const res = await api.patch("/users/rankType", { rankType });

    return res.data;
  },
};
