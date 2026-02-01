"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Moon, Sun } from "lucide-react";
import { Switch } from "../ui/switch";
import CreateNewChat from "../chat/CreateNewChat";
import NewGroupChatModal from "../chat/NewGroupChatModal";
import GroupChatList from "../chat/GroupChatList";
import AddFriendModal from "../chat/AddFriendModal";
import DirectChatList from "../chat/DirectChatList";
import { useThemeStore } from "@/stores/useThemeStore";
import { NavUser } from "./nav-user";
import { useAuthStore } from "@/stores/useAuthStore";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isDark, toggleTheme } = useThemeStore();
  const { user } = useAuthStore();

  return (
    <Sidebar variant="inset" {...props}>
      {/* header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              asChild
              className="bg-gradient-primary"
            >
              <a href="#">
                <div className="flex w-full items-center px-2 justify-between">
                  <div className="text-xl font-bold text-white">MyChat</div>

                  <div className="flex gap-2 items-center">
                    <Sun className="size-4 text-white/80" />
                    <Switch
                      className="data-[state=checked]:bg-background/80"
                      checked={isDark}
                      onCheckedChange={toggleTheme}
                    />
                    <Moon className="size-4 text-white/80" />
                  </div>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* content */}
      <SidebarContent className="beautiful-scrollbar">
        {/* new chat */}
        <SidebarGroup>
          <SidebarGroupContent>
            <CreateNewChat />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* group chat */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">nhóm chat</SidebarGroupLabel>
          <SidebarGroupAction title="Tạo nhóm" className="cursor-pointer">
            <NewGroupChatModal />
          </SidebarGroupAction>

          <SidebarGroupContent>
            <GroupChatList />
          </SidebarGroupContent>
        </SidebarGroup>

        {/* friend chat */}
        <SidebarGroup>
          <SidebarGroupLabel className="uppercase">bạn bè</SidebarGroupLabel>
          <SidebarGroupAction title="Kết bạn" className="cursor-pointer">
            <AddFriendModal />
          </SidebarGroupAction>

          <SidebarGroupContent>
            <DirectChatList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>{user && <NavUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}
