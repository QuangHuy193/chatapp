import api from "@/lib/axios";
import type { UpdateInfoPayload } from "@/types/user";

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

  updateInfo: async (data: UpdateInfoPayload) => {
    const payload: UpdateInfoPayload = {};

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        payload[key as keyof UpdateInfoPayload] = value;
      }
    });
    const res = await api.patch("/users/info", payload);

    return res.data;
  },

  changePass: async (oldPass: string, newPass: string) => {
    const res = await api.patch("/users/changePass", {
      oldPass,
      newPass,
    });

    return res.data;
  },

  deleteAccount: async () => {
    const res = await api.delete("/users/delete",);

    return res.data;
  },
};
