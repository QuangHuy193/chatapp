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
        useChatStore.getState().markAsSeen();
      }

      useChatStore.getState().updateConversation(updatedConversation);
    });

    // đọc mess
    socket.on("read-message", ({ conversation, lastMessage }) => {
      const updated = {
        lastMessage,
        _id: conversation._id,
        lastMessageAt: conversation.lastMessageAt,
        unreadCount: conversation.unreadCount,
        seenBy: conversation.seenBy,
      };
      // const { conversations } = useChatStore();

      // let conversationOld =
      //   conversations.find((c) => c._id === conversation._id) ?? conversation;

      // conversationOld = {
      //   ...conversationOld,
      //   lastMessage,
      //   _id: conversation._id,
      //   lastMessageAt: conversation.lastMessageAt,
      //   unreadCount: conversation.unreadCount,
      //   seenBy: conversation.seenBy,
      // };

      useChatStore.getState().updateConversation(updated);
    });

    // new group
    socket.on("new-group", (conversation) => {
      useChatStore.getState().addConvo(conversation);

      socket.emit("join-conversation", conversation._id)
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
