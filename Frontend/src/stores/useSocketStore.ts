import { create } from "zustand";
import { io, type Socket } from "socket.io-client";
import type { SocketState } from "@/types/store";
import { useAuthStore } from "./useAuthStore";
import { useChatStore } from "./useChatStore";

const baseUrl = import.meta.env.VITE_SOCKET_URL;

export const useSocketStore = create<SocketState>((set, get) => ({
  socket: null,
  onlineUsers: [],

  connectSocket: () => {
    const accessToken = useAuthStore.getState().accessToken;
    const exitstingSocket = get().socket;

    if (exitstingSocket) return;

    const socket: Socket = io(baseUrl, {
      auth: { token: accessToken },
      transports: ["websocket"],
    });

    set({ socket });

    socket.on("connect", () => {
      console.log("Đã kết nối với socket");
    });

    // event online-user
    socket.on("online-user", (userIds) => {
      set({ onlineUsers: userIds });
    });

    // new-message
    socket.on("new-message", ({ message, conversation, unreadCount }) => {
      useChatStore.getState().addMessage(message);

      const lastMessage = {
        _id: conversation.lastMessage._id,
        content: conversation.lastMessage.content,
        createdAt: conversation.lastMessage.createdAt,
        sender: {
          _id: conversation.lastMessage.senderId,
          displayName: "",
          avatarUrl: null,
        },
      };

      const updatedConversation = {
        ...conversation,
        lastMessage,
        unreadCount,
      };

      if (
        useChatStore.getState().activeConversationId === message.conversationId
      ) {
        // đánh dâu đã đọc
      }

        useChatStore.getState().updateConversation(updatedConversation)
    });

  
  },
  disconnectSocket: () => {
    const exitstingSocket = get().socket;

    if (exitstingSocket) {
      exitstingSocket.disconnect();
      set({ socket: null });
    }
  },
}));
