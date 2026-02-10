import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    // người nhận thông báo
    recipient_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    // người gây ra hành động (accept / reject / message...)
    sender_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // loại thông báo
    type: {
      type: String,
      enum: ["FRIEND_ACCEPTED", "FRIEND_REJECTED", "MESSAGE", "SYSTEM"],
      required: true,
      index: true,
    },

    // nội dung hiển thị
    content: {
      type: String,
      required: true,
    },

    // trạng thái đã đọc hay chưa
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
  },
  {
    timestamps: true, // createdAt, updatedAt
  },
);

notificationSchema.index({ recipient_id: 1, createdAt: -1 });

notificationSchema.index({ recipient_id: 1, isRead: 1 });

export default mongoose.model("Notification", notificationSchema);
