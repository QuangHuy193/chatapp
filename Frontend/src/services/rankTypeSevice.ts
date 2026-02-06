import api from "@/lib/axios";

export const rankTypeSevice = {
  getAllRanktype: async () => {
    const res = await api.get(`/ranks/rankType`);
    return res.data.rankType;
  },
};
