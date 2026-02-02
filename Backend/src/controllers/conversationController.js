import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { io } from "../socket/index.js";

export const createConversation = async (req, res) => {
  try {
    const { type, name, memberIds } = req.body;
    const userId = req.user._id;

    if (
      !type ||
      (type === "group" && !name) ||
      !memberIds ||
      !Array.isArray(memberIds) ||
      memberIds.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Tên nhóm và danh sách thành viên là bắt buộc" });
    }

    let conversation;
    if (type === "direct") {
      const participantId = memberIds[0];

      conversation = await Conversation.findOne({
        type: "direct",
        "participants.userId": { $all: [userId, participantId] },
      });

      if (!conversation) {
        conversation = new Conversation({
          type: "direct",
          participants: [{ userId }, { userId: participantId }],
          lastMessageAt: new Date(),
        });

        await conversation.save();
      }
    }

    if (type === "group") {
      conversation = new Conversation({
        type: "group",
        participants: [{ userId }, ...memberIds.map((id) => ({ userId: id }))],
        lastMessageAt: new Date(),
        group: {
          name,
          createdBy: userId,
        },
      });

      await conversation.save();
    }

    if (!conversation) {
      return res.status(400).json({ message: "Type không hợp lệ" });
    }

    await conversation.populate([
      {
        path: "participants.userId",
        select: "displayName avatarUrl",
      },
      {
        path: "seenBy",
        select: "displayName avatarUrl",
      },
      {
        path: "lastMessage.senderId",
        select: "displayName avatarUrl",
      },
    ]);

    return res.status(201).json({ conversation });
  } catch (error) {
    console.error("Lỗi khi tạo hội thoại", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const userId = req.user._id;

    const conversations = await Conversation.find({
      "participants.userId": userId,
    })
      .sort({ lastMessageAt: -1, updatedAt: -1 })
      .populate([
        {
          path: "participants.userId",
          select: "displayName avatarUrl",
        },
        {
          path: "seenBy",
          select: "displayName avatarUrl",
        },
        {
          path: "lastMessage.senderId",
          select: "displayName avatarUrl",
        },
      ]);

    const formatted = conversations.map((conver) => {
      const participants = (conver.participants || []).map((p) => ({
        userId: p.userId?._id,
        displayName: p.userId?.displayName,
        avatarUrl: p.userId?.avatarUrl ?? null,
        joinAt: p.joinAt,
      }));

      return {
        ...conver.toObject(),
        unreadCount: conver.unreadCount || {},
        participants,
      };
    });

    return res.status(200).json({ conversations: formatted });
  } catch (error) {
    console.error("Lỗi khi lấy danh sách hội thoại", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit = 50, cursor } = req.query;

    const query = { conversationId };
    if (cursor) {
      query.createdAt = { $lt: new Date(cursor) };
    }

    let messages = await Message.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit) + 1);
    let nextCursor;
    if (messages.length > Number(limit)) {
      const nextMessage = messages[messages.length - 1];
      nextCursor = nextMessage.createdAt.toISOString();
      messages.pop();
    }

    messages = messages.reverse();
    return res.status(200).json({ messages, nextCursor });
  } catch (error) {
    console.error("Lỗi khi lấy tin nhắn trong hội thoại", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};

export const getConversationForSocketIO = async (userId) => {
  try {
    const conversations = await Conversation.find(
      {
        "participants.userId": userId,
      },
      { _id: 1 },
    );
    return conversations.map((c) => c._id.toString());
  } catch (error) {
    console.error("Lỗi khi getConversationForSocketIO", error);
    return [];
  }
};

export const markAsSeen = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id.toString();

    const conversation = await Conversation.findById(conversationId).lean();

    if (!conversation) {
      return res.status(404).json({ message: "Không tìm thấy hội thoại" });
    }

    const last = conversation.lastMessage;

    if (!last) {
      return res.status(200).json({ message: "Không có tin nhắn để xem" });
    }

    if (last.senderId.toString() === userId) {
      return res.status(200).json({ message: "Người gửi không cần xem" });
    }

    const updated = await Conversation.findByIdAndUpdate(
      conversationId,
      {
        $addToSet: { seenBy: userId },
        $set: {
          [`unreadCount.${userId}`]: 0,
        },
      },
      { new: true },
    );

    io.to(conversationId).emit("read-message", {
      conversation: updated,
      lastMessage: {
        _id: updated.lastMessage._id,
        content: updated.lastMessage.content,
        createdAt: updated.lastMessage.createdAt,
        sender: {
          _id: updated.lastMessage.senderId,
        },
      },
    });

    return res.status(200).json({
      message: "markAsSeen",
      seenBy: updated?.seenBy || [],
      myUnreadCount: updated?.unreadCount[userId] || 0,
    });
  } catch (error) {
    console.error("Lỗi khi markAsSeen", error);
    return res.status(500).json({ message: "Lỗi hệ thống" });
  }
};
