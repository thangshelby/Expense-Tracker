export type GlobalThemeType = 'dark' | 'light';
export type ExpenseCategoryType =
  | 'Food'
  | 'Transportation'
  | 'Utilities'
  | 'Entertainment'
  | 'Healthcare'
  | 'Education'
  | '';

export type PaymentType =
  | 'Cash'
  | 'Credit Card'
  | 'Bank Transfer'
  | 'E-Wallet'
  | '';

export interface SideNavbarItemType {
  key: string;
  title: string;
  icon: any;
}

export interface TransactionType {
  id: string;
  name: string;
  amount: number;
  expenseDate: Date;
  invoice: string | null;
  // weekNumber: number;
  isRecurring: boolean;
  expenseCategory: ExpenseCategoryType;
  payment: PaymentType;
  location: string;
  comment: string;
}

export interface Representative {
  name: string;
  image: string;
}
