import type { Friend } from "@/types/user";
import UserAvatar from "../chat/UserAvatar";

interface InviteSuggestionListProps {
  fillterFriends: Friend[];
  onSelect: (friend: Friend) => void;
}

const InviteSuggestionList = ({
  fillterFriends,
  onSelect,
}: InviteSuggestionListProps) => {
  if (!fillterFriends || fillterFriends.length === 0) return;

  return (
    <div className="border rounded-lg mt-2 max-h-45 overflow-y-auto divide-y">
      {fillterFriends.map((f) => (
        <div
          key={f._id}
          className="flex items-center gap-3 p-2 cursor-pointer hover:bg-muted transition"
          onClick={() => onSelect(f)}
        >
          <UserAvatar
            type="chat"
            name={f.displayName}
            avatarUrl={f.avatarUrl}
          />

          <span className="font-medium">{f.displayName}</span>
        </div>
      ))}
    </div>
  );
};

export default InviteSuggestionList;
