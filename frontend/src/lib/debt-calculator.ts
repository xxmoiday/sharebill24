// Core debt simplification algorithm

export interface Balance {
  userId: string;
  name: string;
  amount: number; // positive = được nợ, negative = nợ người khác
}

export interface Transaction {
  from: string; // người trả (id)
  fromName: string;
  to: string; // người nhận (id)
  toName: string;
  amount: number;
}

/**
 * Simplifies debts using a greedy algorithm
 * Minimizes the number of transactions needed to settle all debts
 */
export function simplifyDebts(balances: Balance[]): Transaction[] {
  // Separate creditors and debtors
  const creditors = balances
    .filter((b) => b.amount > 0)
    .map((b) => ({ ...b }))
    .sort((a, b) => b.amount - a.amount);

  const debtors = balances
    .filter((b) => b.amount < 0)
    .map((b) => ({ ...b }))
    .sort((a, b) => a.amount - b.amount);

  const transactions: Transaction[] = [];
  let i = 0,
    j = 0;

  while (i < creditors.length && j < debtors.length) {
    const credit = creditors[i];
    const debt = debtors[j];
    const amount = Math.min(credit.amount, -debt.amount);

    if (amount > 0) {
      transactions.push({
        from: debt.userId,
        fromName: debt.name,
        to: credit.userId,
        toName: credit.name,
        amount: Math.round(amount),
      });
    }

    credit.amount -= amount;
    debt.amount += amount;

    if (Math.abs(credit.amount) < 1) i++;
    if (Math.abs(debt.amount) < 1) j++;
  }

  return transactions;
}

/**
 * Calculate balances from expenses
 */
export function calculateBalances(
  expenses: Array<{
    payerId: string;
    payerName: string;
    amount: number;
    shares: Array<{ participantId: string; participantName: string; amount: number }>;
  }>
): Balance[] {
  const balanceMap = new Map<string, Balance>();

  for (const expense of expenses) {
    // Payer paid the full amount
    const payerBalance = balanceMap.get(expense.payerId) || {
      userId: expense.payerId,
      name: expense.payerName,
      amount: 0,
    };
    payerBalance.amount += expense.amount;
    balanceMap.set(expense.payerId, payerBalance);

    // Each participant owes their share
    for (const share of expense.shares) {
      const participantBalance = balanceMap.get(share.participantId) || {
        userId: share.participantId,
        name: share.participantName,
        amount: 0,
      };
      participantBalance.amount -= share.amount;
      balanceMap.set(share.participantId, participantBalance);
    }
  }

  return Array.from(balanceMap.values());
}

/**
 * Calculate total debt amount
 */
export function calculateTotalDebt(transactions: Transaction[]): number {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
}
