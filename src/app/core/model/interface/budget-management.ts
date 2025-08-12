export interface Budget {
  id: number;
  category: string;
  categoryIcon: string;
  monthlyLimit: number;
  currentSpent: number;
  remainingAmount: number;
  usagePercentage: number;
  status: 'safe' | 'warning' | 'exceeded';
  month: string;
  year: number;
  createdDate: Date;
  lastUpdated: Date;
}

export interface BudgetAlert {
  id: number;
  budgetId: number;
  category: string;
  type: 'warning' | 'exceeded';
  message: string;
  threshold: number;
  currentAmount: number;
  date: Date;
  isRead: boolean;
}

export interface Transaction {
  id: string;
  name: string;
  amount: number;
  category: string;
  date: Date;
  type: 'expense' | 'income';
}
