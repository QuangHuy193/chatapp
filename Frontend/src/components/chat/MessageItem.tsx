import { cn, formatMessageTime } from "@/lib/utils";
import type { Conversation, Message, Participant } from "@/types/chat";
import UserAvatar from "./UserAvatar";
import { APP_NAME } from "@/lib/constant";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface MessageItemProps {
  message: Message;
  index: number;
  messages: Message[];
  selectedConvo: Conversation;
  lastMessageStatus: "dilevered" | "seen";
}

const MessageItem = ({
  message,
  index,
  messages,
  selectedConvo,
  lastMessageStatus,
}: MessageItemProps) => {
  const prevMess = messages[index - 1];

  const isGroupBreak =
    index === 0 ||
    message.senderId !== prevMess.senderId ||
    new Date(message.createdAt).getTime() -
      new Date(prevMess?.createdAt || 0).getTime() >
      180000; // quá 3 phút

  const isLastInSequence =
    index === messages.length - 1 ||
    messages[index + 1].senderId !== message.senderId;

  const participant = selectedConvo.participants.find(
    (p: Participant) => p._id.toString() === message.senderId.toString(),
  );

  return (
    <div
      className={cn(
        "flex gap-2 message-bounce mb-0.5",
        message.isOwn ? "justify-end" : "justify-start",
      )}
    >
      {/* avatar */}
      {!message.isOwn && (
        <div className="w-8">
          {isGroupBreak && (
            <UserAvatar
              type="chat"
              name={participant?.displayName ?? APP_NAME}
              avatarUrl={participant?.avatarUrl ?? undefined}
            />
          )}
        </div>
      )}

      {/* mess */}
      <div
        className={cn(
          "max-w-xs lg:max-w-md space-y-1 flex flex-col",
          message.isOwn ? "items-end" : "items-start",
        )}
      >
        <Card
          className={cn(
            "p-3",
            message.isOwn
              ? "bg-chat-bubble-sent border-0"
              : "bg-chat-bubble-received",
          )}
        >
          <p className="text-sm leading-relaxed wrap-break-word">
            {message.content}
          </p>
        </Card>

        {/* time */}
        {isLastInSequence && message.isOwn && (
          <span className="text-muted-foreground text-xs px-1 flex">
            {formatMessageTime(new Date(message.createdAt))}
          </span>
        )}

        {/* status */}
        {message.isOwn &&
          isLastInSequence &&
          message._id === selectedConvo.lastMessage?._id && (
            <Badge
              variant="outline"
              className={cn(
                "text-xs px-1.5 py-0.5 h-4 border-0 flex",
                lastMessageStatus === "seen"
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground",
              )}
            >
              {lastMessageStatus === "dilevered" ? "Đã gửi ✓" : "Đã xem ✓✓"}
            </Badge>
          )}
      </div>
    </div>
  );
};

export default MessageItem;
