import type { User } from "./user";

export interface authState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  signUp: (
    userName: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<boolean>;
}
