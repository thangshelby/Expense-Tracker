export interface FinancialData {
  month: string;
  income: number;
  expense: number;
  balance: number;
  previousMonthIncome?: number;
  previousMonthExpense?: number;
}

export interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  icon: string;
}

export interface AccountData {
  name: string;
  balance: number;
  transactions: number;
  type: string;
}

export type ChartType =
  | 'pie'
  | 'bar'
  | 'doughnut'
  | 'line'
  | 'polarArea'
  | 'radar';
