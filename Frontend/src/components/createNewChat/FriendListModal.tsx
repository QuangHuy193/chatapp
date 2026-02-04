import { useFriendStore } from "@/stores/useFriendStore";
import { DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { MessageCircleMore, Users } from "lucide-react";
import { Card } from "../ui/card";
import UserAvatar from "../chat/UserAvatar";
import { useChatStore } from "@/stores/useChatStore";

const FriendListModal = () => {
  const { friends } = useFriendStore();
  const { createConversation } = useChatStore();

  const handleAddconversation = async (friendId: string) => {
    await createConversation("direct", "", [friendId]);
  };

  return (
    <DialogContent className="glass max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl capitalize">
          <MessageCircleMore className="size-5" />
          Bắt đầu hội thoại
        </DialogTitle>
      </DialogHeader>

      {/* friend list */}
      <div className="space-y-4">
        <h1
          className="text-sm font-semibold text-muted-foreground mb-3 uppercase 
        tracking-wide"
        >
          Danh sách bạn bè
        </h1>

        {!friends || friends.length === 0 ? (
          <div className="flex text-center py-8 text-muted-foreground">
            <Users className="size-12 mx-auto mb-3 opacity-50" />
            Chưa có bạn bè. Hãy thêm bạn bè để trò chuyện nào!!!
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {friends.map((f) => (
              <Card
                onClick={() => handleAddconversation(f._id)}
                key={f._id}
                className="p-3 cursor-pointer transition-smooth hover:shadow-soft glass
                hover:bg-muted/30 group/friendCard"
              >
                <div className="flex items-center gap-3">
                  {/* avatar */}
                  <div>
                    <UserAvatar
                      name={f.displayName}
                      avatarUrl={f.avatarUrl ?? undefined}
                      type="sidebar"
                    />
                  </div>
                  {/* user info */}
                  <div className="flex flex-1 flex-col min-w-0">
                    <h2 className="font-semibold truncate text-sm">
                      {f.displayName}
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      @{f.userName}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default FriendListModal;
