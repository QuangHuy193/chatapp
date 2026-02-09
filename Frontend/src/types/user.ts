export interface User {
  _id: string;
  userName: string;
  email: string;
  displayName: string;
  isActive: boolean;
  avatarUrl?: string;
  bio?: string;
  phone?: string;
  activePoint?: number;
  rank?: {
    type: {
      _id: string;
      name: string;
    };
    level: {
      _id: string;
      level: number;
      label: string;
      minAP: number;
      maxAP: number;
      uiCss: string;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

export interface Friend {
  _id: string;
  userName: string;
  displayName: string;
  isActive: boolean;
  avatarUrl?: string;
  rank?: {
    type: {
      _id: string;
      name: string;
    };
    level: {
      _id: string;
      level: number;
      label: string;
      minAP: number;
      maxAP: number;
      uiCss: string;
    };
  };
}

export interface FriendRequest {
  _id: string;
  from?: {
    _id: string;
    userName: string;
    displayName: string;
    isActive: boolean;
    avatarUrl?: string;
    rank?: {
      type: {
        _id: string;
        name: string;
      };
      level: {
        _id: string;
        level: number;
        label: string;
        minAP: number;
        maxAP: number;
        uiCss: string;
      };
    };
  };
  to?: {
    _id: string;
    userName: string;
    displayName: string;
    isActive: boolean;
    avatarUrl?: string;
    rank?: {
      type: {
        _id: string;
        name: string;
      };
      level: {
        _id: string;
        level: number;
        label: string;
        minAP: number;
        maxAP: number;
        uiCss: string;
      };
    };
  };
  message: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateInfoPayload {
  userName?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  bio?: string;
}
