import api from "@/lib/axios";
import type { ConversationResponse, Message } from "../types/chat";

const PAGELIMIT = 50;

interface fetchMessageProps {
  messages: Message[];
  cursor: string;
}

export const chatService = {
  async fetchConversations(): Promise<ConversationResponse> {
    const res = await api.get("/conversations");
    return res.data;
  },

  async fetchMessage(id: string, cursor?: string): Promise<fetchMessageProps> {
    const res = await api.get(
      `/conversations/:${id}/messages?limit=${PAGELIMIT}&cursor=${cursor}`,
    );
    return { messages: res.data.messages, cursor: res.data.nextCursor };
  },
};
