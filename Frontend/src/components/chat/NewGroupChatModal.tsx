import { useFriendStore } from "@/stores/useFriendStore";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { UserPlus, Users } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type { Friend } from "@/types/user";
import InviteSuggestionList from "../newGroupChat/InviteSuggestionList";
import SelectedUserList from "../newGroupChat/SelectedUserList";
import { toast } from "sonner";
import { useChatStore } from "@/stores/useChatStore";

const NewGroupChatModal = () => {
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [invitedUsers, setInvitedUsers] = useState<Friend[]>([]);
  const { friends, getAllFriend } = useFriendStore();
  const { createConversation, loading } = useChatStore();

  const fillterFriend = friends.filter(
    (fri) =>
      fri.displayName.toLowerCase().includes(search.toLowerCase()) &&
      !invitedUsers.some((u) => u._id === fri._id),
  );

  const handleGetFriend = async () => {
    await getAllFriend();
  };

  const handleSelectFriend = (friend: Friend) => {
    setInvitedUsers([...invitedUsers, friend]);

    setSearch("");
  };

  const handleRemoveFriend = (friend: Friend) => {
    setInvitedUsers(invitedUsers.filter((u) => u._id !== friend._id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (invitedUsers.length === 0) {
        toast.warning("Bạn phải mời ít nhất 1 người vào nhóm!");
        return;
      }

      await createConversation(
        "group",
        groupName,
        invitedUsers.map((u) => u._id.toString()),
      );

      setSearch("");
      setInvitedUsers([]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          onClick={handleGetFriend}
          className="flex z-10 justify-center items-center size-5 rounded-full 
          hover:bg-sidebar-accent transition cursor-pointer"
        >
          <Users className="size-4" />
          <span className="sr-only">Tạo nhóm</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-106.25 border-none">
        <DialogHeader>
          <DialogTitle className="capitalize">tạo nhóm chat mới</DialogTitle>
        </DialogHeader>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* tên nhóm */}
          <div className="space-y-2">
            <Label htmlFor="group-name" className="text-sm font-semibold">
              Tên nhóm
            </Label>

            <Input
              id="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="Nhập tên nhóm vào đây..."
              className="glass border-border/50 focus:border-primary/50 transition-smooth"
              required
            />
          </div>

          {/* mời thành viên */}
          <div className="space-y-2 ">
            <Label htmlFor="invite" className="font-semibold text-sm">
              Mời thành viên
            </Label>

            <Input
              id="invite"
              placeholder="Tìm theo tên hiển thị..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            {/* ds user gợi ý */}
            {search && fillterFriend.length > 0 && (
              <InviteSuggestionList
                fillterFriends={fillterFriend}
                onSelect={handleSelectFriend}
              />
            )}

            {/* ds user đã chọn */}
            {invitedUsers && (
              <SelectedUserList
                inviteUsers={invitedUsers}
                onRemove={handleRemoveFriend}
              />
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-chat text-white hover:opacity-90 
            transition-smooth"
            >
              {loading ? (
                <span>Đang tạo nhóm...</span>
              ) : (
                <>
                  <UserPlus className="size-4 mr-2" />
                  Tạo nhóm
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NewGroupChatModal;
