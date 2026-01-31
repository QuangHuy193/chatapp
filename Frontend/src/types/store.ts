import type { Conversation, Message } from "./chat";
import type { User } from "./user";

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
  loading: boolean;

  reset: () => void;
  setActiveConversationId: (id: string | null) => void;
  fetchConversations: () => Promise<void>;
}
