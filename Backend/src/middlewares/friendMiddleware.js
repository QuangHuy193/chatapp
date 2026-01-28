import Conversation from "../models/Conversation.js";
import Friend from "../models/Friend.js";
import mongoose from "mongoose";
import { swapFriend } from "../util/friendHelper.js";

export const checkFriendship = async (req, res, next) => {
  try {
    const me = req.user._id.toString();
    const receptionId = req.body?.receptionId?.toString() ?? null;
    const memberIds = req.body?.memberIds ?? [];

    // gửi tin nhắn trực tiếp
    if (!receptionId && memberIds.lenght === 0) {
      return res
        .status(400)
        .json({ message: "Cần cung cấp receptionId hoặc memberIds" });
    }

    if (receptionId) {
      const [a, b] = swapFriend(me, receptionId);

      const isFriend = await Friend.findOne({
        userA: new mongoose.Types.ObjectId(a),
        userB: new mongoose.Types.ObjectId(b),
      });

      if (!isFriend) {
        return res.status(403).json({ message: "2 người chưa là bạn bè" });
      }
      return next();
    }

    // tạo nhóm chat
    const friendChecks = memberIds.map(async (memberId) => {
      const [userA, userB] = swapFriend(me, memberId);

      const friend = await Friend.findOne({
        userA: new mongoose.Types.ObjectId(userA),
        userB: new mongoose.Types.ObjectId(userB),
      });

      return friend ? null : memberId;
    });

    const result = await Promise.all(friendChecks);
    // lọc các giá trị true
    const notFriend = result.filter(Boolean);

    if (notFriend.length > 0) {
      return res
        .status(403)
        .json({ message: "Bạn chỉ có thể thêm bạn bè vào nhóm", notFriend });
    }

    return next();
  } catch (error) {
    console.error("Lỗi xảy ra khi checkFriendship", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const checkGroupMemberShip = async (req, res, next) => {
  try {
    const { conversationId } = req.body;
    const userId = req.user._id;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ message: "Cuộc hội thoại không tồn tài" });
    }

    const isMember = conversation.participants.some(
      (p) => p.userId.toString() === userId.toString(),
    );

    if (!isMember) {
      return res
        .status(403)
        .json({ message: "Bạn không phải thành viên nhóm chat này" });
    }

    req.conversation = conversation;
    next();
  } catch (error) {
    console.error("Lỗi xảy ra khi checkGroupMemberShip", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
