import RankType from "../models/RankType.js";

export const getAllRankType = async (req, res) => {
  try {
    const rankTypes = await RankType.aggregate([
      {
        $match: { isActive: true },
      },
      {
        $lookup: {
          from: "ranktypelevels", // collection name trùng với mongodb
          localField: "_id",
          foreignField: "rankTypeId",
          as: "levels",
        },
      },
      {
        $addFields: {
          levels: {
            $sortArray: {
              input: "$levels",
              sortBy: { level: 1 },
            },
          },
        },
      },
    ]);

    return res.status(200).json({ rankType: rankTypes });
  } catch (error) {
    console.error("Lỗi khi getAllRankType", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
