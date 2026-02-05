import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";
import UnreadCountBadge from "./UnreadCountBadge";
import GroupChatAvatar from "./GroupChatAvatar";
import GroupChatMenu from "./GroupChatMenu";
import { MoreHorizontal } from "lucide-react";

const GroupChatCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore();
  const {
    activeConversationId,
    setActiveConversationId,
    messages,
    fetchMessage,
  } = useChatStore();

  if (!user) return null;

  const unreadCount = convo.unreadCount[user._id];
  const name = convo.group?.name ?? "";

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
        name={name}
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
            {unreadCount > 0 && <UnreadCountBadge unreadCount={unreadCount} />}
            <GroupChatAvatar participants={convo.participants} type="chat" />
          </>
        }
        subtitle={
          <p className="text-sm truncate text-muted-foreground">
            {convo.participants.length} thành viên
          </p>
        }
        menu={
          <GroupChatMenu
            buttonTrigger={
              <MoreHorizontal className="size-4 text-muted-foreground " />
            }
          />
        }
      />
    </div>
  );
};

export default GroupChatCard;
