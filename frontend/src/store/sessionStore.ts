// Zustand: current session

import { create } from 'zustand';
import { Session, Expense, SessionParticipant, Settlement } from '@/types/session';

interface SessionState {
  currentSession: Session | null;
  expenses: Expense[];
  participants: SessionParticipant[];
  settlements: Settlement[];

  // Actions
  setSession: (session: Session | null) => void;
  setExpenses: (expenses: Expense[]) => void;
  addExpense: (expense: Expense) => void;
  updateExpense: (id: string, expense: Partial<Expense>) => void;
  removeExpense: (id: string) => void;
  setParticipants: (participants: SessionParticipant[]) => void;
  addParticipant: (participant: SessionParticipant) => void;
  removeParticipant: (id: string) => void;
  setSettlements: (settlements: Settlement[]) => void;
  clearSession: () => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  currentSession: null,
  expenses: [],
  participants: [],
  settlements: [],

  setSession: (session) => set({ currentSession: session }),

  setExpenses: (expenses) => set({ expenses }),

  addExpense: (expense) =>
    set((state) => ({ expenses: [...state.expenses, expense] })),

  updateExpense: (id, updated) =>
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === id ? { ...e, ...updated } : e
      ),
    })),

  removeExpense: (id) =>
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    })),

  setParticipants: (participants) => set({ participants }),

  addParticipant: (participant) =>
    set((state) => ({
      participants: [...state.participants, participant],
    })),

  removeParticipant: (id) =>
    set((state) => ({
      participants: state.participants.filter((p) => p.id !== id),
    })),

  setSettlements: (settlements) => set({ settlements }),

  clearSession: () =>
    set({
      currentSession: null,
      expenses: [],
      participants: [],
      settlements: [],
    }),
}));
