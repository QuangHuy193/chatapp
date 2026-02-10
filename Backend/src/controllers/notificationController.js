import Notification from "../models/Notification.js";

export const getAllNotification = async (req, res) => {
  try {
    const { limit = 10, cursor } = req.query;
    const user = req.user;

    const query = {
      recipient_id: user._id,
    };

    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    let notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) + 1)
      .populate({
        path: "sender_id",
        select: "displayName avatarUrl",
      });

    let nextCursor = null;

    if (notifications.length > Number(limit)) {
      const lastNotification = notifications[notifications.length - 1];
      nextCursor = lastNotification.createdAt.toISOString();
      notifications.pop();
    }

    return res.status(200).json({
      notifications,
      nextCursor,
    });
  } catch (error) {
    console.error("Lỗi khi lấy thông báo", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const readNotification = async (req, res) => {
  try {
    const { notiId } = req.params;
    const user = req.user;

    const noti = await Notification.findById(notiId);

    if (!noti) {
      return res.status(400).json({
        message: "Không tìm thấy thông báo!",
      });
    }

    if (user._id.toString() !== noti.recipient_id.toString()) {
      return res.status(400).json({
        message: "Bạn không có quyền đọc thông báo này!",
      });
    }

    await Notification.findByIdAndUpdate(notiId, { isRead: true });

    return res.sendStatus(204);
  } catch (error) {
    console.error("Lỗi khi đọc thông báo", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
