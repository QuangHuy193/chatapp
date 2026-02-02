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
  const prevMess =
    index + 1 < messages.length ? messages[index + 1] : undefined;

  const isShowtime =
    index === 0 ||
    new Date(message.createdAt).getTime() -
      new Date(prevMess?.createdAt || 0).getTime() >
      60000; // quá 1 phút

  const isGroupBreak = isShowtime || message.senderId !== prevMess?.senderId;

  const participant = selectedConvo.participants.find(
    (p: Participant) => p.userId.toString() === message.senderId.toString(),
  );

  return (
    <>
      {/* status */}
      <div className="flex justify-end">
        {message.isOwn && message._id === selectedConvo.lastMessage?._id && (
          <Badge
            variant="outline"
            className={cn(
              "text-xs px-1.5 py-0.5 h-4 border-0 flex ",
              lastMessageStatus === "seen"
                ? "bg-primary/20 text-primary"
                : "bg-muted text-muted-foreground",
            )}
          >
            {lastMessageStatus === "dilevered" ? "Đã gửi ✓" : "Đã xem ✓✓"}
          </Badge>
        )}
      </div>
     
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
        </div>
      </div>

       {/* time */}
      {isShowtime && (
        <span className="text-muted-foreground text-xs px-1 flex justify-center ">
          {formatMessageTime(new Date(message.createdAt))}
        </span>
      )}

    </>
  );
};

export default MessageItem;
