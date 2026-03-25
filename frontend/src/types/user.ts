// User types

export interface User {
  id: string;
  username: string;
  email: string;
  displayName?: string;
  avatarColor: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserStats {
  totalPaid: number;
  totalOwed: number;
  sessionsCount: number;
  groupsCount: number;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface AuthUser extends User {
  tokens?: AuthTokens;
}
