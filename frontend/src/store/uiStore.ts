// Zustand: UI state

import { create } from 'zustand';

interface UIState {
  // Bottom sheet / modal states
  isAddExpenseOpen: boolean;
  isAddMemberOpen: boolean;
  isSessionSummaryOpen: boolean;

  // Loading states
  isGlobalLoading: boolean;

  // Theme
  isDarkMode: boolean;

  // Actions
  setAddExpenseOpen: (open: boolean) => void;
  setAddMemberOpen: (open: boolean) => void;
  setSessionSummaryOpen: (open: boolean) => void;
  setGlobalLoading: (loading: boolean) => void;
  toggleDarkMode: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isAddExpenseOpen: false,
  isAddMemberOpen: false,
  isSessionSummaryOpen: false,
  isGlobalLoading: false,
  isDarkMode: false,

  setAddExpenseOpen: (open) => set({ isAddExpenseOpen: open }),
  setAddMemberOpen: (open) => set({ isAddMemberOpen: open }),
  setSessionSummaryOpen: (open) => set({ isSessionSummaryOpen: open }),
  setGlobalLoading: (loading) => set({ isGlobalLoading: loading }),
  toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
}));
