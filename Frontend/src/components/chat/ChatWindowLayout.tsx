import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import ChatWindowSkeleton from "./ChatWindowSkeleton";
import { SidebarInset } from "../ui/sidebar";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatWindowBody from "./ChatWindowBody";
import MessageInput from "./MessageInput";
import { useEffect } from "react";

const ChatWindowLayout = () => {
  const {
    activeConversationId,
    conversations,
    messageLoading: loading,
    messages,
    markAsSeen,
  } = useChatStore();
  const selectedConvo =
    conversations.find((c) => c._id === activeConversationId) ?? null;

  // đánh dấu đã đọc
  useEffect(() => {
    if (!selectedConvo) return;

    const markSeen = async () => {
      try {
        await markAsSeen();
      } catch (error) {
        console.error("Lỗi khi markSeen", error);
      }
    };

    markSeen();
  }, [markAsSeen, selectedConvo]);

  if (!selectedConvo) return <ChatWelcomeScreen />;

  if (loading) return <ChatWindowSkeleton />;

  return (
    <SidebarInset className="flex h-full flex-col flex-1 overflow-hidden shadow-md 
    rounded-sm">
      {/* header */}
      <ChatWindowHeader chat={selectedConvo} />

      {/* content */}
      <div className="flex-1 overflow-y-auto bg-primary-foreground">
        <ChatWindowBody />
      </div>

      {/* input */}
      <MessageInput selectedConvo={selectedConvo} />
    </SidebarInset>
  );
};

export default ChatWindowLayout;
