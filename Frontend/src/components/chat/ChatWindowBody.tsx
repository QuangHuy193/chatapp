import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import MessageItem from "./MessageItem";
import { useEffect, useState } from "react";

const ChatWindowBody = () => {
  const {
    activeConversationId,
    conversations,
    messages: allMessages,
  } = useChatStore();

  const [lastMessageStatus, setLastMessageStatus] = useState<
    "dilevered" | "seen"
  >("dilevered");

  const messagesInConvo = allMessages[activeConversationId!]?.items ?? [];
  const selectedConvo = conversations.find(
    (c) => c._id === activeConversationId,
  );

  useEffect(() => {
    const lastMessage = selectedConvo?.lastMessage;
    if (!lastMessage) return;

    const seenBy = selectedConvo?.seenBy ?? [];

    setLastMessageStatus(seenBy.length > 0 ? "seen" : "dilevered");
  }, [selectedConvo]);

  if (!selectedConvo) {
    return <ChatWelcomeScreen />;
  }

  if (messagesInConvo.length === 0) {
    return (
      <div className="flex h-full justify-center items-center text-muted-foreground">
        Chưa có tin nhắn nào trong cuộc hội thoại này!
      </div>
    );
  }

  return (
    <div className="p-2 bg-primary-foreground h-full flex flex-col overflow-hidden">
      <div className="flex flex-col overflow-y-auto overflow-x-hidden beautiful-scrollbar">
        {messagesInConvo.map((mess, index) => (
          <MessageItem
            key={mess._id ?? index}
            message={mess}
            selectedConvo={selectedConvo}
            index={index}
            messages={messagesInConvo}
            lastMessageStatus={lastMessageStatus}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatWindowBody;
