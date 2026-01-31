import { useChatStore } from "@/stores/useChatStore";
import GroupMessageCard from "./GroupChatCard";

const GroupChatList = () => {
  const { conversations } = useChatStore();

  if (!conversations) return;

  const groupConversatons = conversations.filter((c) => c.type === "group");
  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {groupConversatons.map((convo) => (
        <GroupMessageCard convo={convo} />
      ))}
    </div>
  );
};

export default GroupChatList;
