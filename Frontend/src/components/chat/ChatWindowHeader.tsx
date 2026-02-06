import { useChatStore } from "@/stores/useChatStore";
import type { Conversation } from "@/types/chat";
import { SidebarTrigger } from "../ui/sidebar";
import { useAuthStore } from "@/stores/useAuthStore";
import { Separator } from "../ui/separator";
import UserAvatar from "./UserAvatar";
import { APP_NAME } from "@/lib/constant";
import StatusBadge from "./StatusBadge";
import GroupChatAvatar from "./GroupChatAvatar";
import { useSocketStore } from "@/stores/useSocketStore";
import GroupChatMenu from "./GroupChatMenu";
import { MoreVertical } from "lucide-react";
import RankLabel from "../rankLabel/RankLabel";

const ChatWindowHeader = ({ chat }: { chat?: Conversation }) => {
  const { activeConversationId, conversations } = useChatStore();
  const { user } = useAuthStore();
  const { onlineUsers } = useSocketStore();

  chat = chat ?? conversations.find((c) => c._id === activeConversationId);

  if (!chat) {
    return (
      <header className="md:hidden sticky top-0 z-10 flex items-center gap-2">
        <SidebarTrigger className="-ml-1 text-foreground" />
      </header>
    );
  }

  let otherUser;
  if (chat.type === "direct") {
    const otherUsers = chat.participants.filter((p) => p.userId !== user?._id);
    otherUser = otherUsers.length > 0 ? otherUsers[0] : null;
  }

  if (!user && !otherUser) return;

  return (
    <header
      className="sticky top-0 z-10 flex items-center px-4 py-2 
    bg-background"
    >
      <div className="flex gap-2 w-full items-center">
        <SidebarTrigger className="-ml-1 text-foreground" />

        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />

        <div className="p-2 w-full flex items-center gap-3">
          {/* avatar */}
          <div className="relative">
            {chat.type === "direct" ? (
              <>
                <UserAvatar
                  type="sidebar"
                  name={otherUser?.displayName ?? APP_NAME}
                  avatarUrl={otherUser?.avatarUrl ?? undefined}
                />
                <StatusBadge
                  status={
                    onlineUsers.includes(otherUser?.userId ?? "")
                      ? "online"
                      : "offline"
                  }
                />
              </>
            ) : (
              <GroupChatAvatar
                participants={chat.participants}
                type="sidebar"
              />
            )}
          </div>

          {/* name */}
          <h2 className="font-semibold text-foreground">
            {chat.type === "direct" ? (
              <div className="flex items-center ml-6 flex-col gap-2">
                {otherUser?.rank?.level.label &&
                  otherUser?.rank?.level.uiCss && (
                    <RankLabel
                      label={otherUser?.rank?.level.label}
                      rankCss={otherUser?.rank?.level.uiCss}
                    />
                  )}
                <span>{otherUser?.displayName}</span>
              </div>
            ) : (
              chat.group?.name
            )}
          </h2>
        </div>
      </div>

      <div className="md:hidden">
        {chat.type === "group" && (
          <GroupChatMenu buttonTrigger={<MoreVertical />} />
        )}
      </div>
    </header>
  );
};

export default ChatWindowHeader;
