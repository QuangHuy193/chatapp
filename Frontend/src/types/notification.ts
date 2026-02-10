export interface Notification {
  _id: string;
  recipient_id: string;
  sender_id: {
    _id: string;
    displayName: string;
    avatarUrl?: string;
  };
  type: "FRIEND_ACCEPTED" | "FRIEND_REJECTED" | "MESSAGE" | "SYSTEM";
  content: string;
  isRead: boolean;
  createdAt: string;
  updatedAt?: string;
}
