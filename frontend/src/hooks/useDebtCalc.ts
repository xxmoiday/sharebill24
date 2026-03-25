// Debt simplification hook

import { useMemo } from 'react';
import {
  simplifyDebts,
  calculateBalances,
  Balance,
  Transaction,
} from '@/lib/debt-calculator';
import { Expense, SessionParticipant } from '@/types/session';

interface UseDebtCalcOptions {
  expenses: Expense[];
  participants: SessionParticipant[];
}

export function useDebtCalc({ expenses, participants }: UseDebtCalcOptions) {
  // Calculate balances for each participant
  const balances = useMemo<Balance[]>(() => {
    if (!expenses.length || !participants.length) return [];

    const formattedExpenses = expenses.map((expense) => ({
      payerId: expense.payerId,
      payerName: expense.payer?.displayName || expense.payer?.username || 'Unknown',
      amount: Number(expense.amount),
      shares: (expense.shares || []).map((share) => ({
        participantId: share.participantId,
        participantName:
          share.participant?.guestName ||
          share.participant?.user?.displayName ||
          share.participant?.user?.username ||
          'Unknown',
        amount: Number(share.amount),
      })),
    }));

    return calculateBalances(formattedExpenses);
  }, [expenses, participants]);

  // Simplify debts to minimize transactions
  const transactions = useMemo<Transaction[]>(() => {
    return simplifyDebts(balances);
  }, [balances]);

  // Total amount spent
  const totalSpent = useMemo(() => {
    return expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  }, [expenses]);

  // Total debt to settle
  const totalDebt = useMemo(() => {
    return transactions.reduce((sum, t) => sum + t.amount, 0);
  }, [transactions]);

  // Who owes the most
  const topDebtor = useMemo(() => {
    const debtors = balances.filter((b) => b.amount < 0);
    if (!debtors.length) return null;
    return debtors.reduce((min, b) => (b.amount < min.amount ? b : min));
  }, [balances]);

  // Who is owed the most
  const topCreditor = useMemo(() => {
    const creditors = balances.filter((b) => b.amount > 0);
    if (!creditors.length) return null;
    return creditors.reduce((max, b) => (b.amount > max.amount ? b : max));
  }, [balances]);

  return {
    balances,
    transactions,
    totalSpent,
    totalDebt,
    topDebtor,
    topCreditor,
  };
}
