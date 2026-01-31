import { useAuthStore } from "@/stores/useAuthStore";
import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import ChatCard from "./ChatCard";

const GroupMessageCard = ({ convo }: { convo: Conversation }) => {
  const { user } = useAuthStore();
  const { activeConversationId, setActiveConversationId, messages } =
    useChatStore();

  if (!user) return null;

  const unreadCount = convo.unreadCounts[user._id];
  const name = convo.group?.name ?? "";

  const handleSeletctConversation = async (id: string) => {
    setActiveConversationId(id);
    if (!messages[id]) {
      // TODO fetch message
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
        leftSection={<></>}
        subtitle={
          <p className="text-sm truncate text-muted-foreground">
            {convo.participants.length} thành viên
          </p>
        }
      />
    </div>
  );
};

export default GroupMessageCard;
