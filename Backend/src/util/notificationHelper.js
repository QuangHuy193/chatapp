import Notification from "../models/Notification.js";
import { io } from "../socket/index.js";

export const createNewNotiFriend = async (
  recipient_id,
  sender_id,
  type,
  content,
) => {
  try {
    const noti = await Notification.create({
      recipient_id,
      sender_id,
      type,
      content,
      isRead: false,
    });

    await noti.populate({
      path: "sender_id",
      select: "displayName avatarUrl",
    });

    io.to(recipient_id.toString()).emit("notification", noti);
  } catch (error) {
    console.error("Lỗi khi createNewNotiFriend", error);
  }
};
