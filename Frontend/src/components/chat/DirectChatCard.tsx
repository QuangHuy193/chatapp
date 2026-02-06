import type { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";
import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import { cn } from "@/lib/utils";
import UserAvatar from "./UserAvatar";
import StatusBadge from "./StatusBadge";
import UnreadCountBadge from "./UnreadCountBadge";
import { useSocketStore } from "@/stores/useSocketStore";
import { APP_NAME } from "@/lib/constant";
import { MoreHorizontal } from "lucide-react";

const DirectMessageCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore();
  const {
    activeConversationId,
    setActiveConversationId,
    messages,
    fetchMessage,
  } = useChatStore();
  const { onlineUsers } = useSocketStore();

  if (!user) return null;

  const otherUser = convo.participants.find((p) => p.userId !== user?._id);
  if (!otherUser) return null;

  const unreadCount = convo.unreadCount[user._id];
  const lastMessage = convo.lastMessage?.content ?? "";

  const handleSeletctConversation = async (id: string) => {
    setActiveConversationId(id);
    if (!messages[id]) {
      await fetchMessage();
    }
  };

  return (
    <div>
      <ChatCard
        convoId={convo._id}
        name={otherUser.displayName ?? APP_NAME}
        rankLabel={otherUser.rank?.level.label ?? ""}
        rankCss={otherUser.rank?.level.uiCss ?? ""}
        timmestamp={
          convo.lastMessage?.createdAt
            ? new Date(convo.lastMessage.createdAt)
            : undefined
        }
        isActive={activeConversationId === convo._id}
        onSelect={handleSeletctConversation}
        unreadCount={unreadCount}
        leftSection={
          <>
            <UserAvatar
              type="sidebar"
              name={otherUser.displayName ?? ""}
              avatarUrl={otherUser.avatarUrl ?? undefined}
            />

            <StatusBadge
              status={
                onlineUsers.includes(otherUser?.userId ?? "")
                  ? "online"
                  : "offline"
              }
            />
            {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
          </>
        }
        subtitle={
          <p
            className={cn(
              "text-sm truncate",
              unreadCount > 0
                ? "font-medium text-foreground"
                : "text-muted-foreground",
            )}
          >
            {convo.lastMessage?.sender._id !== otherUser?.userId && "Bạn: "}
            {lastMessage}
          </p>
        }
        menu={<MoreHorizontal className="size-4 text-muted-foreground " />}
      />
    </div>
  );
};

export default DirectMessageCard;
