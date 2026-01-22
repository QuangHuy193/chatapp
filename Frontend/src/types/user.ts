export interface User {
  _id: string;
  userName: string;
  email: string;
  hashedPassword: string;
  displayName: string;
  avatarUrl?: string;
  avatarId?: string;
  bio?: string;
  phone?: string;
  createdAt?: string;
  updatedAt?: string;
}
