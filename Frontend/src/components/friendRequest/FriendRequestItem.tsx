import type { FriendRequest } from "@/types/user";
import type { ReactNode } from "react";
import UserAvatar from "../chat/UserAvatar";

interface FriendRequestItemProps {
  requestInfo: FriendRequest;
  action: ReactNode;
  type: "sent" | "received";
}
const FriendRequestItem = ({
  requestInfo,
  action,
  type,
}: FriendRequestItemProps) => {
  if (!requestInfo) return;

  const info = type === "sent" ? requestInfo.to : requestInfo.from;

  if (!info) return;

  return (
    <div
      className="flex justify-between items-center rounded-lg shadow-md border
    border-primary-foreground p-3"
    >
      {/* user */}
      <div className="flex items-center gap-3">
        <UserAvatar
          type="sidebar"
          name={info.displayName}
          avatarUrl={info.avatarUrl}
        />

        <div>
          <p className="font-medium">{info.displayName}</p>
          <p className="text-sm text-muted-foreground">@{info.userName}</p>
        </div>
      </div>

      {/* action */}
      {action}
    </div>
  );
};

export default FriendRequestItem;
