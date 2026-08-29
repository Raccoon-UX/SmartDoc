export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: UserProfile | null;
  session: any | null;
  isLoading: boolean;
  isConfigured: boolean;
}

export interface SignUpPayload {
  email: string;
  password: string;
  fullName: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export interface ResetPasswordPayload {
  password: string;
}
