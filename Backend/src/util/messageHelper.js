export const updateCoversationAfterCreateMessage = (
  conversation,
  message,
  senderId,
) => {
  console.log("conversation2", conversation);
  console.log("message2", message);
  console.log("senderId2", senderId);
  conversation.set({
    seenBy: [],
    lastMessageAt: message.createdAt,
    lastMessage: {
      _id: message._id,
      content: message.content,
      senderId,
      createdAt: message.createdAt,
    },
  });

  conversation.participants.forEach((p) => {
    const memberId = p.userId.toString();
    const isSender = memberId === senderId.toString();
    const prevCount = conversation.unreadCount.get(memberId) || 0;
    conversation.unreadCount.set(memberId, isSender ? 0 : prevCount + 1);
  });
};
