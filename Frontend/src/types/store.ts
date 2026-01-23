import type { User } from "./user";

export interface authState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  clearState: () => void;
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
