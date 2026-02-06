import { mapUserInParticipantWithRank } from "./userHelper.js";

export const mapCoversation = async (conversations) => {
  return Promise.all(
    conversations.map(async (conver) => {
      const participants = await Promise.all(
        (conver.participants || []).map(async (p) => {
          const user = {
            userId: p.userId?._id,
            displayName: p.userId?.displayName,
            avatarUrl: p.userId?.avatarUrl ?? null,
            rankTypeId: p.userId?.rankTypeId ?? "",
            rankTypeLevelId: p.userId?.rankTypeLevelId ?? "",
            joinAt: p.joinAt,
          };

          return await mapUserInParticipantWithRank(user);
        }),
      );

      const lastMsg = conver.lastMessage?.toObject();

      const { senderId, ...restLastMsg } = lastMsg || {};

      return {
        ...conver.toObject(),
        lastMessage: lastMsg
          ? {
              ...restLastMsg,
              sender: senderId,
            }
          : null,
        unreadCount: conver.unreadCount || {},
        participants,
      };
    }),
  );
};
