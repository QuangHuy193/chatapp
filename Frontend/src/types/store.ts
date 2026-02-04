import type { Socket } from "socket.io-client";
import type { Conversation, Message } from "./chat";
import type { Friend, FriendRequest, User } from "./user";

export interface authState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  clearState: () => void;
  setAccessToken: (accessToken: string) => void;
  signUp: (
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
  signIn: (userName: string, password: string) => Promise<boolean>;
  signOut: () => Promise<boolean>;
  fetchMe: () => Promise<void>;
  refreshToken: () => Promise<void>;
}

export interface ThemeState {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}

export interface ChatState {
  conversations: Conversation[];
  messages: Record<
    string,
    {
      items: Message[];
      hasMore: boolean;
      nextCursor?: string | null;
    }
  >;
  activeConversationId: string | null;
  convoLoading: boolean;
  loading:boolean;
  messageLoading: boolean;

  reset: () => void;
  setActiveConversationId: (id: string | null) => void;
  fetchConversations: () => Promise<void>;
  fetchMessage: (conversationId?: string) => Promise<void>;
  sendDirectMessage: (
    recipientId: string,
    content: string,
    imgUrl?: string,
    conversationId?: string,
  ) => Promise<void>;
  sendGroupMessage: (
    conversationId: string,
    content: string,
    imgUrl?: string,
  ) => Promise<void>;
  // add mess
  addMessage: (message: Message) => Promise<void>;
  // update convo
  // !
  updateConversation: (conversation: unknown) => void;
  markAsSeen: () => Promise<void>;
  addConvo: (convo: Conversation) => void;
  createConversation: (
    type: "direct" | "group",
    name: string,
    memberIds: string[],
  ) => Promise<void>;
}

export interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];
  connectSocket: () => void;
  disconnectSocket: () => void;
}

export interface FriendState {
  friends: Friend[];
  loading: boolean;
  receivedList: FriendRequest[];
  sentList: FriendRequest[];
  searchUserByUserName: (userName: string) => Promise<User | null>;
  sendFriendRequest: (to: string, message?: string) => Promise<string>;
  getAllFriendRequest: () => Promise<void>;
  acceptRequest: (requestId: string) => Promise<void>;
  declineRequest: (requestId: string) => Promise<void>;
  getAllFriend: () => Promise<void>;
}
