import { Bell, ChevronsUpDown, LogOut, UserIcon, UserPlus } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import type { User } from "@/types/user";
import Logout from "../auth/Logout";
import { useState } from "react";
import FriendRequestDialog from "../friendRequest/FriendRequestDialog";
import ProfileDialog from "../profile/ProfileDialog";
import { useFriendStore } from "@/stores/useFriendStore";
import { Badge } from "../ui/badge";

export function NavUser({ user }: { user: User }) {
  const { isMobile } = useSidebar();
  const { receivedList } = useFriendStore();
  const [friendRequestOpen, setFriendRequestOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.displayName}
                  </span>
                  <span className="truncate text-xs">{user.userName}</span>
                </div>
                <div className="relative">
                  <ChevronsUpDown className="ml-auto size-5" />
                  {receivedList.length > 0 && (
                    <div className="pulse-ring absolute z-20 -top-1.5 -right-1.5">
                      <Badge
                        className="size-4 text-xs bg-destructive border flex items-center 
                      justify-center p-0 border-background"
                      >
                        {receivedList.length > 99
                          ? `${receivedList.length}+` 
                          : receivedList.length}
                      </Badge>
                    </div>
                  )}
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? "bottom" : "right"}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.displayName}
                    </span>
                    <span className="truncate text-xs">{user.userName}</span>
                  </div>
                </div>
              </DropdownMenuLabel>

              <DropdownMenuSeparator />

              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setProfileOpen(true)}>
                  <UserIcon className="text-muted-foreground dark:group-focus:text-accent-foreground" />
                  Tài khoản
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setFriendRequestOpen(true)}
                  className="relative"
                >
                  <UserPlus className="text-muted-foreground dark:group-focus:text-accent-foreground" />
                  Lời mời kết bạn
                  {receivedList && receivedList.length > 0 && (
                    <span
                      className="absolute h-4 w-4 bg-destructive rounded-full text-white 
                      justify-center items-center flex right-1 top-1/2 -translate-y-1/2 
                      pulse-ring"
                    >
                      {receivedList.length > 99
                        ? `${receivedList.length}+`
                        : receivedList.length}
                    </span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bell className="text-muted-foreground dark:group-focus:text-accent-foreground" />
                  Thông báo
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="cursor-pointer"
                variant="destructive"
              >
                <LogOut className="text-destructive" />
                <Logout />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <FriendRequestDialog
        open={friendRequestOpen}
        setOpen={setFriendRequestOpen}
      />

      <ProfileDialog open={profileOpen} setOpen={setProfileOpen} />
    </>
  );
}
