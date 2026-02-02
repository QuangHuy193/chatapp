import { useChatStore } from "@/stores/useChatStore";
import ChatWelcomeScreen from "./ChatWelcomeScreen";
import MessageItem from "./MessageItem";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const ChatWindowBody = () => {
  const {
    activeConversationId,
    conversations,
    messages: allMessages,
    fetchMessage,
  } = useChatStore();

  const key = `chat-scroll-${activeConversationId}`;
  const [lastMessageStatus, setLastMessageStatus] = useState<
    "dilevered" | "seen"
  >("dilevered");

  const messagesInConvo = allMessages[activeConversationId!]?.items ?? [];
  const reversedMessagesInConvo = [...messagesInConvo].reverse();
  const hasMore = allMessages[activeConversationId!]?.hasMore ?? false;
  const selectedConvo = conversations.find(
    (c) => c._id === activeConversationId,
  );

  // ref
  const messageEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const fetchMoreMessages = async () => {
    if (!activeConversationId) {
      return;
    }

    try {
      await fetchMessage(activeConversationId);
    } catch (error) {
      console.error("Lỗi khi tải thêm tin nhắn", error);
    }
  };

  const handleScrollSave = () => {
    const container = containerRef.current;

    if (!container || !activeConversationId) return;

    sessionStorage.setItem(
      key,
      JSON.stringify({
        scrollTop: container.scrollTop,
        scrollHeight: container.scrollHeight,
      }),
    );
  };

  useEffect(() => {
    const lastMessage = selectedConvo?.lastMessage;
    if (!lastMessage) return;

    const seenBy = selectedConvo?.seenBy ?? [];

    setLastMessageStatus(seenBy.length > 0 ? "seen" : "dilevered");
  }, [selectedConvo]);

  // cuộn khi mở, thêm tn
  useLayoutEffect(() => {
    if (!messageEndRef.current) {
      return;
    }

    messageEndRef.current.scrollIntoView({
      behavior: "instant",
      block: "end",
    });
  }, [activeConversationId, allMessages]);

  useLayoutEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const item = sessionStorage.getItem(key);

    if (item) {
      const { scrollTop } = JSON.parse(item);
      requestAnimationFrame(() => {
        container.scrollTop = scrollTop;
      });
    }
  }, [messagesInConvo.length]);

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
      <div
        onScroll={handleScrollSave}
        ref={containerRef}
        id="scrollableDiv"
        className="flex flex-col-reverse overflow-y-auto overflow-x-hidden 
        beautiful-scrollbar"
      >
        <div ref={messageEndRef}></div>
        <InfiniteScroll
          dataLength={messagesInConvo.length}
          next={fetchMoreMessages}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
          loader={<p>Đang tải...</p>}
          inverse={true}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "visible",
          }}
        >
          {reversedMessagesInConvo.map((mess, index) => (
            <MessageItem
              key={mess._id ?? index}
              message={mess}
              selectedConvo={selectedConvo}
              index={index}
              messages={reversedMessagesInConvo}
              lastMessageStatus={lastMessageStatus}
            />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ChatWindowBody;
