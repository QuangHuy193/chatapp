import type { Notification } from "@/types/notification";
import UserAvatar from "../chat/UserAvatar";
import { cn, formatOnlineTimeFromISO } from "@/lib/utils";
import { User } from "lucide-react";
import { useNotificationStore } from "@/stores/useNotificationStore";

interface NotificationCardProps {
  noti: Notification;
}

const NotificationCard = ({ noti }: NotificationCardProps) => {
  const { readNotification } = useNotificationStore();
  const handleRead = async (noti: string) => {
    await readNotification(noti);
  };
  return (
    <div
      onClick={() => handleRead(noti._id)}
      className={cn(
        "flex items-center gap-2 p-4 cursor-pointer",
        noti.isRead ? "bg-none" : "bg-blue-50",
      )}
    >
      <div className="relative">
        <UserAvatar
          type="sidebar"
          name={noti.sender_id.displayName}
          avatarUrl={noti.sender_id.avatarUrl ?? undefined}
        />
        <div className="absolute -right-1.5 -bottom-1.5">
          {(noti.type === "FRIEND_ACCEPTED" ||
            noti.type === "FRIEND_REJECTED") && (
            <User className="text-green-300 bg-slate-50 rounded-full" />
          )}
        </div>
      </div>
      {/* nội dung */}
      <div className="flex-1 flex justify-between">
        <div>{noti.content}</div>
        <div>{formatOnlineTimeFromISO(noti.createdAt)}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
