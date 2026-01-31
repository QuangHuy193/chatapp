import { useChatStore } from "@/stores/useChatStore";
import DirectMessageCard from "./DirectChatCard";

const DirectChatList = () => {
  const { conversations } = useChatStore();

  if (!conversations) return;

  const directConversatons = conversations.filter((c) => c.type === "direct");
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {directConversatons.map((convo) => (
        <DirectMessageCard convo={convo} />
      ))}
    </div>
  );
};

export default DirectChatList;
