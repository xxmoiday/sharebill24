// Auth hook

import { useCallback } from 'react';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/api';
import { User } from '@/types/user';

export function useAuth() {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } = useAuthStore();

  const register = useCallback(async (data: RegisterRequest): Promise<User> => {
    setLoading(true);
    try {
      const response = await api.post<AuthResponse>('/auth/register', data);
      login(response.data.user, {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      return response.data.user;
    } finally {
      setLoading(false);
    }
  }, [login, setLoading]);

  const loginFn = useCallback(async (data: LoginRequest): Promise<User> => {
    setLoading(true);
    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      login(response.data.user, {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
      });
      return response.data.user;
    } finally {
      setLoading(false);
    }
  }, [login, setLoading]);

  const logoutFn = useCallback(async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } catch {
      // Ignore logout errors
    } finally {
      logout();
    }
  }, [logout]);

  const refreshUser = useCallback(async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    useAuthStore.getState().setUser(response.data);
    return response.data;
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    register,
    login: loginFn,
    logout: logoutFn,
    refreshUser,
  };
}
