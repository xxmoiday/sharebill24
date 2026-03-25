// Session hook

import { useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Session, Expense, SessionParticipant } from '@/types/session';
import { useSessionStore } from '@/store/sessionStore';

export function useSession(sessionId?: string) {
  const queryClient = useQueryClient();
  const { setSession, setExpenses, setParticipants } = useSessionStore();

  // Fetch session
  const {
    data: session,
    isLoading: isLoadingSession,
    error: sessionError,
  } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: async () => {
      const response = await api.get<Session>(`/sessions/${sessionId}`);
      setSession(response.data);
      setExpenses(response.data.expenses || []);
      setParticipants(response.data.participants || []);
      return response.data;
    },
    enabled: !!sessionId,
  });

  // Create session
  const createSession = useMutation({
    mutationFn: async (data: Partial<Session>) => {
      const response = await api.post<Session>('/sessions', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
    },
  });

  // Update session
  const updateSession = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Session> }) => {
      const response = await api.put<Session>(`/sessions/${id}`, data);
      return response.data;
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['session', updated.id] });
    },
  });

  // Add expense
  const addExpense = useMutation({
    mutationFn: async ({
      sessionId,
      expense,
    }: {
      sessionId: string;
      expense: Partial<Expense>;
    }) => {
      const response = await api.post<Expense>(
        `/sessions/${sessionId}/expenses`,
        expense
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['session', variables.sessionId] });
    },
  });

  // Settle session
  const settleSession = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.post<Session>(`/sessions/${id}/settle`);
      return response.data;
    },
    onSuccess: (updated) => {
      queryClient.invalidateQueries({ queryKey: ['session', updated.id] });
    },
  });

  return {
    session,
    isLoadingSession,
    sessionError,
    createSession,
    updateSession,
    addExpense,
    settleSession,
  };
}
