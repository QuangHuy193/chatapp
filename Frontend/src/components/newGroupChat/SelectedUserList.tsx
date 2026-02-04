import type { Friend } from "@/types/user";
import UserAvatar from "../chat/UserAvatar";
import { X } from "lucide-react";

interface SelectedUserListProps {
  inviteUsers: Friend[];
  onRemove: (user: Friend) => void;
}
const SelectedUserList = ({ inviteUsers, onRemove }: SelectedUserListProps) => {
  if (!inviteUsers || inviteUsers.length === 0) return;
  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {inviteUsers.map((u) => (
        <div
          key={u._id}
          className="flex items-center gap-1 bg-muted text-sm rounded-full px-3 py-1"
        >
          <UserAvatar
            type="chat"
            name={u.displayName}
            avatarUrl={u.avatarUrl}
          />
          <span>{u.displayName}</span>

          <X
            className="size-3 cursor-pointer hover:text-destructive"
            onClick={() => onRemove(u)}
          />
        </div>
      ))}
    </div>
  );
};

export default SelectedUserList;
