import mongoose from "mongoose";

export const rankTypeLevelSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    rankTypeId: {
      type: String,
      ref: "RankType",
      required: true,
      index: true,
    },
    level: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    minAP: {
      type: Number,
      required: true,
    },
    maxAP: {
      type: Number,
      required: true,
    },
    uiCss: {
      type: String, // lưu class dạng "tu-tien-1", file css định dạng class dùng chung      
    },   
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("RankTypeLevel", rankTypeLevelSchema);
