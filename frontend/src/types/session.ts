// Session types

export type VibeType = 'FOOD' | 'DRINKS' | 'TRAVEL' | 'SHOPPING' | 'PARTY' | 'CAFE' | 'SPORTS' | 'OTHER';

export type SplitType = 'EQUAL' | 'EXACT' | 'PERCENTAGE' | 'BY_ITEM';

export type SessionStatus = 'ACTIVE' | 'SETTLED' | 'ARCHIVED';

export type SettlementStatus = 'PENDING' | 'CONFIRMED';

export interface Session {
  id: string;
  name: string;
  description?: string;
  vibe: VibeType;
  totalAmount: number;
  currency: string;
  date: string;
  status: SessionStatus;
  groupId?: string;
  createdById: string;
  createdAt: string;
  updatedAt: string;
  expenses?: Expense[];
  settlements?: Settlement[];
  participants?: SessionParticipant[];
}

export interface SessionParticipant {
  id: string;
  sessionId: string;
  userId?: string;
  guestName?: string;
  user?: User;
  expenseShares?: ExpenseShare[];
}

export interface Expense {
  id: string;
  sessionId: string;
  payerId: string;
  description: string;
  amount: number;
  splitType: SplitType;
  createdAt: string;
  payer?: User;
  shares?: ExpenseShare[];
}

export interface ExpenseShare {
  id: string;
  expenseId: string;
  participantId: string;
  amount: number;
  percentage?: number;
  participant?: SessionParticipant;
}

export interface Settlement {
  id: string;
  sessionId: string;
  payerId: string;
  receiverId: string;
  amount: number;
  note?: string;
  status: SettlementStatus;
  createdAt: string;
  settledAt?: string;
  payer?: User;
  receiver?: User;
}

export interface TimelineDataPoint {
  date: string;
  sessionName: string;
  vibe: VibeType;
  totalAmount: number;
  runningTotal: number;
  participants: string[];
  sessionId: string;
}

import { User } from './user';
