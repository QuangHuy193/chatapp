import mongoose from "mongoose";

const messageSchema =new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true },
);

// index kết hợp, (1 tăng dần, -1 giảm dần)
messageSchema.index({ conversationId: 1, createdAt: -1 });

export default Message = mongoose.model("Message", messageSchema);
