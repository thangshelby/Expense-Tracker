// budget.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  Budget,
  BudgetAlert,
  Transaction,
} from '../../features/user/budget-management/budget-management';

@Injectable({
  providedIn: 'root',
})
export class BudgetService {
  private apiUrl = 'http://localhost:3000/api'; // Thay đổi theo API của bạn

  private budgetsSubject = new BehaviorSubject<Budget[]>([]);
  private alertsSubject = new BehaviorSubject<BudgetAlert[]>([]);
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  public budgets$ = this.budgetsSubject.asObservable();
  public alerts$ = this.alertsSubject.asObservable();
  public transactions$ = this.transactionsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData() {
    // Mock budget data
    const mockBudgets: Budget[] = [
      {
        id: 1,
        category: 'Food',
        categoryIcon: 'pi pi-shopping-cart',
        monthlyLimit: 2000000,
        currentSpent: 1500000,
        remainingAmount: 500000,
        usagePercentage: 75,
        status: 'warning',
        month: String(new Date().getMonth() + 1).padStart(2, '0'),
        year: new Date().getFullYear(),
        createdDate: new Date(),
        lastUpdated: new Date(),
      },
      {
        id: 2,
        category: 'Entertainment',
        categoryIcon: 'pi pi-star',
        monthlyLimit: 1000000,
        currentSpent: 1100000,
        remainingAmount: -100000,
        usagePercentage: 110,
        status: 'exceeded',
        month: String(new Date().getMonth() + 1).padStart(2, '0'),
        year: new Date().getFullYear(),
        createdDate: new Date(),
        lastUpdated: new Date(),
      },
      {
        id: 3,
        category: 'Transportation',
        categoryIcon: 'pi pi-car',
        monthlyLimit: 1500000,
        currentSpent: 800000,
        remainingAmount: 700000,
        usagePercentage: 53,
        status: 'safe',
        month: String(new Date().getMonth() + 1).padStart(2, '0'),
        year: new Date().getFullYear(),
        createdDate: new Date(),
        lastUpdated: new Date(),
      },
    ];

    // Mock transaction data
    const mockTransactions: Transaction[] = [
      {
        id: 'txn-001',
        name: 'Lunch at cafe',
        amount: 120000,
        category: 'Food',
        date: new Date(),
        type: 'expense',
      },
      {
        id: 'txn-002',
        name: 'Movie ticket',
        amount: 200000,
        category: 'Entertainment',
        date: new Date(),
        type: 'expense',
      },
      {
        id: 'txn-003',
        name: 'Grab ride',
        amount: 75000,
        category: 'Transportation',
        date: new Date(),
        type: 'expense',
      },
      {
        id: 'txn-004',
        name: 'Restaurant dinner',
        amount: 300000,
        category: 'Food',
        date: new Date(),
        type: 'expense',
      },
      {
        id: 'txn-005',
        name: 'Concert ticket',
        amount: 500000,
        category: 'Entertainment',
        date: new Date(),
        type: 'expense',
      },
      {
        id: 'txn-006',
        name: 'Bus fare',
        amount: 25000,
        category: 'Transportation',
        date: new Date(),
        type: 'expense',
      },
    ];

    this.budgetsSubject.next(mockBudgets);
    this.transactionsSubject.next(mockTransactions);
    this.updateBudgetUsage();
  }

  // Lấy tất cả ngân sách
  getAllBudgets(): Observable<Budget[]> {
    return this.budgets$;
    // return this.http.get<Budget[]>(`${this.apiUrl}/budgets`);
  }

  // Lấy ngân sách theo tháng/năm
  getBudgetsByMonth(month: string, year: number): Observable<Budget[]> {
    return this.budgets$.pipe(
      map((budgets) =>
        budgets.filter(
          (budget) => budget.month === month && budget.year === year,
        ),
      ),
    );
    // return this.http.get<Budget[]>(`${this.apiUrl}/budgets?month=${month}&year=${year}`);
  }

  // Thêm mới ngân sách
  createBudget(
    budget: Omit<
      Budget,
      'id' | 'currentSpent' | 'remainingAmount' | 'usagePercentage' | 'status'
    >,
  ): Observable<Budget> {
    const current = this.budgetsSubject.value;
    const newId = Math.max(...current.map((item) => item.id), 0) + 1;

    const newBudget: Budget = {
      ...budget,
      id: newId,
      currentSpent: 0,
      remainingAmount: budget.monthlyLimit,
      usagePercentage: 0,
      status: 'safe',
    };

    const updated = [...current, newBudget];
    this.budgetsSubject.next(updated);
    this.updateBudgetUsage();

    return new Observable((observer) => {
      observer.next(newBudget);
      observer.complete();
    });
    // return this.http.post<Budget>(`${this.apiUrl}/budgets`, budget);
  }

  // Cập nhật ngân sách
  updateBudget(id: number, budget: Partial<Budget>): Observable<Budget> {
    const current = this.budgetsSubject.value;
    const index = current.findIndex((item) => item.id === id);

    if (index !== -1) {
      current[index] = {
        ...current[index],
        ...budget,
        lastUpdated: new Date(),
      };
      this.budgetsSubject.next([...current]);
      this.updateBudgetUsage();

      return new Observable((observer) => {
        observer.next(current[index]);
        observer.complete();
      });
    }

    throw new Error('Budget not found');
    // return this.http.put<Budget>(`${this.apiUrl}/budgets/${id}`, budget);
  }

  // Xóa ngân sách
  deleteBudget(id: number): Observable<boolean> {
    const current = this.budgetsSubject.value;
    const filtered = current.filter((item) => item.id !== id);
    this.budgetsSubject.next(filtered);

    return new Observable((observer) => {
      observer.next(true);
      observer.complete();
    });
    // return this.http.delete<boolean>(`${this.apiUrl}/budgets/${id}`);
  }

  // Cập nhật usage dựa trên transactions
  private updateBudgetUsage() {
    const budgets = this.budgetsSubject.value;
    const transactions = this.transactionsSubject.value;

    budgets.forEach((budget) => {
      const categoryTransactions = transactions.filter(
        (t) =>
          t.category === budget.category &&
          t.type === 'expense' &&
          new Date(t.date).getMonth() === parseInt(budget.month) - 1 &&
          new Date(t.date).getFullYear() === budget.year,
      );

      budget.currentSpent = categoryTransactions.reduce(
        (sum, t) => sum + t.amount,
        0,
      );
      budget.remainingAmount = budget.monthlyLimit - budget.currentSpent;
      budget.usagePercentage = Math.round(
        (budget.currentSpent / budget.monthlyLimit) * 100,
      );

      if (budget.usagePercentage >= 100) {
        budget.status = 'exceeded';
      } else if (budget.usagePercentage >= 80) {
        budget.status = 'warning';
      } else {
        budget.status = 'safe';
      }

      budget.lastUpdated = new Date();
    });

    this.budgetsSubject.next([...budgets]);
    this.generateAlerts();
  }

  // Tạo cảnh báo tự động
  private generateAlerts() {
    const budgets = this.budgetsSubject.value;
    const alerts: BudgetAlert[] = [];
    let alertId = 1;

    budgets.forEach((budget) => {
      if (budget.status === 'exceeded') {
        alerts.push({
          id: alertId++,
          budgetId: budget.id,
          category: budget.category,
          type: 'exceeded',
          message: `Bạn đã vượt ngân sách ${budget.category} ${Math.abs(budget.remainingAmount).toLocaleString('vi-VN')} VND`,
          threshold: 100,
          currentAmount: budget.currentSpent,
          date: new Date(),
          isRead: false,
        });
      } else if (budget.status === 'warning') {
        alerts.push({
          id: alertId++,
          budgetId: budget.id,
          category: budget.category,
          type: 'warning',
          message: `Cảnh báo: Bạn đã sử dụng ${budget.usagePercentage}% ngân sách ${budget.category}`,
          threshold: 80,
          currentAmount: budget.currentSpent,
          date: new Date(),
          isRead: false,
        });
      }
    });

    this.alertsSubject.next(alerts);
  }

  // Lấy cảnh báo
  getAlerts(): Observable<BudgetAlert[]> {
    return this.alerts$;
  }

  // Đánh dấu cảnh báo đã đọc
  markAlertAsRead(alertId: number): Observable<boolean> {
    const current = this.alertsSubject.value;
    const alert = current.find((a) => a.id === alertId);

    if (alert) {
      alert.isRead = true;
      this.alertsSubject.next([...current]);

      return new Observable((observer) => {
        observer.next(true);
        observer.complete();
      });
    }

    return new Observable((observer) => {
      observer.next(false);
      observer.complete();
    });
    // return this.http.patch<boolean>(`${this.apiUrl}/alerts/${alertId}/read`, {});
  }

  // Xóa tất cả cảnh báo
  clearAllAlerts(): Observable<boolean> {
    const current = this.alertsSubject.value;
    const updated = current.map((alert) => ({ ...alert, isRead: true }));
    this.alertsSubject.next(updated);

    return new Observable((observer) => {
      observer.next(true);
      observer.complete();
    });
    // return this.http.delete<boolean>(`${this.apiUrl}/alerts`);
  }

  // Lấy thống kê ngân sách
  getBudgetStatistics(
    month?: string,
    year?: number,
  ): Observable<{
    totalBudget: number;
    totalSpent: number;
    totalRemaining: number;
    averageUsage: number;
    categoriesCount: number;
    exceededCount: number;
    warningCount: number;
    safeCount: number;
  }> {
    return this.budgets$.pipe(
      map((budgets) => {
        let filteredBudgets = budgets;

        if (month && year) {
          filteredBudgets = budgets.filter(
            (b) => b.month === month && b.year === year,
          );
        }

        const totalBudget = filteredBudgets.reduce(
          (sum, b) => sum + b.monthlyLimit,
          0,
        );
        const totalSpent = filteredBudgets.reduce(
          (sum, b) => sum + b.currentSpent,
          0,
        );
        const totalRemaining = totalBudget - totalSpent;
        const averageUsage =
          filteredBudgets.length > 0
            ? Math.round(
                filteredBudgets.reduce((sum, b) => sum + b.usagePercentage, 0) /
                  filteredBudgets.length,
              )
            : 0;

        return {
          totalBudget,
          totalSpent,
          totalRemaining,
          averageUsage,
          categoriesCount: filteredBudgets.length,
          exceededCount: filteredBudgets.filter((b) => b.status === 'exceeded')
            .length,
          warningCount: filteredBudgets.filter((b) => b.status === 'warning')
            .length,
          safeCount: filteredBudgets.filter((b) => b.status === 'safe').length,
        };
      }),
    );
    // return this.http.get<any>(`${this.apiUrl}/budgets/statistics?month=${month}&year=${year}`);
  }

  // Gợi ý điều chỉnh ngân sách
  getBudgetSuggestions(): Observable<{
    suggestions: string[];
    quickActions: {
      action: string;
      description: string;
      impact: string;
    }[];
  }> {
    return this.budgets$.pipe(
      map((budgets) => {
        const suggestions: string[] = [];
        const quickActions = [];

        const exceededBudgets = budgets.filter((b) => b.status === 'exceeded');
        const warningBudgets = budgets.filter((b) => b.status === 'warning');
        const lowUsageBudgets = budgets.filter((b) => b.usagePercentage < 50);
        const averageUsage =
          budgets.length > 0
            ? budgets.reduce((sum, b) => sum + b.usagePercentage, 0) /
              budgets.length
            : 0;

        // Gợi ý
        if (exceededBudgets.length > 0) {
          suggestions.push(
            `Có ${exceededBudgets.length} danh mục vượt ngân sách. Xem xét tăng ngân sách hoặc cắt giảm chi tiêu.`,
          );
          exceededBudgets.forEach((budget) => {
            suggestions.push(
              `${budget.category}: Vượt ${Math.abs(budget.remainingAmount).toLocaleString('vi-VN')} VND`,
            );
          });
        }

        if (warningBudgets.length > 0) {
          suggestions.push(
            `${warningBudgets.length} danh mục đang trong vùng cảnh báo (>80% ngân sách).`,
          );
        }

        if (lowUsageBudgets.length > 0) {
          suggestions.push(
            `Có thể giảm ngân sách cho: ${lowUsageBudgets.map((b) => b.category).join(', ')}`,
          );
        }

        if (averageUsage > 90) {
          suggestions.push(
            'Tổng thể sử dụng ngân sách cao. Nên xem xét tăng tổng ngân sách.',
          );
        } else if (averageUsage < 60) {
          suggestions.push(
            'Sử dụng ngân sách thấp. Có thể tối ưu hóa phân bổ ngân sách.',
          );
        }

        if (suggestions.length === 0) {
          suggestions.push('Ngân sách của bạn đang được quản lý tốt!');
        }

        // Quick actions
        quickActions.push({
          action: 'increase_all',
          description: 'Tăng tất cả ngân sách 10%',
          impact: `+${(budgets.reduce((sum, b) => sum + b.monthlyLimit, 0) * 0.1).toLocaleString('vi-VN')} VND`,
        });

        quickActions.push({
          action: 'decrease_all',
          description: 'Giảm tất cả ngân sách 10%',
          impact: `-${(budgets.reduce((sum, b) => sum + b.monthlyLimit, 0) * 0.1).toLocaleString('vi-VN')} VND`,
        });

        if (exceededBudgets.length > 0) {
          quickActions.push({
            action: 'fix_exceeded',
            description: 'Tăng ngân sách các danh mục vượt mức',
            impact: `Cần thêm ${exceededBudgets.reduce((sum, b) => sum + Math.abs(b.remainingAmount), 0).toLocaleString('vi-VN')} VND`,
          });
        }

        return { suggestions, quickActions };
      }),
    );
    // return this.http.get<any>(`${this.apiUrl}/budgets/suggestions`);
  }

  // Áp dụng quick action
  applyQuickAction(action: string, percentage?: number): Observable<Budget[]> {
    const current = this.budgetsSubject.value;

    switch (action) {
      case 'increase_all':
        current.forEach((budget) => {
          budget.monthlyLimit = Math.round(
            budget.monthlyLimit * (1 + (percentage || 10) / 100),
          );
          budget.remainingAmount = budget.monthlyLimit - budget.currentSpent;
          budget.usagePercentage = Math.round(
            (budget.currentSpent / budget.monthlyLimit) * 100,
          );
          budget.lastUpdated = new Date();
        });
        break;

      case 'decrease_all':
        current.forEach((budget) => {
          budget.monthlyLimit = Math.round(
            budget.monthlyLimit * (1 - (percentage || 10) / 100),
          );
          budget.remainingAmount = budget.monthlyLimit - budget.currentSpent;
          budget.usagePercentage = Math.round(
            (budget.currentSpent / budget.monthlyLimit) * 100,
          );
          budget.lastUpdated = new Date();
        });
        break;

      case 'fix_exceeded':
        current.forEach((budget) => {
          if (budget.status === 'exceeded') {
            budget.monthlyLimit = Math.round(budget.currentSpent * 1.1); // 10% buffer
            budget.remainingAmount = budget.monthlyLimit - budget.currentSpent;
            budget.usagePercentage = Math.round(
              (budget.currentSpent / budget.monthlyLimit) * 100,
            );
            budget.lastUpdated = new Date();
          }
        });
        break;
    }

    this.budgetsSubject.next([...current]);
    this.updateBudgetUsage();

    return new Observable((observer) => {
      observer.next(current);
      observer.complete();
    });
    // return this.http.post<Budget[]>(`${this.apiUrl}/budgets/quick-action`, { action, percentage });
  }

  // Thêm transaction mới (để cập nhật budget usage)
  addTransaction(
    transaction: Omit<Transaction, 'id'>,
  ): Observable<Transaction> {
    const current = this.transactionsSubject.value;
    const newTransaction: Transaction = {
      ...transaction,
      id: 'txn-' + (current.length + 1).toString().padStart(3, '0'),
    };

    const updated = [...current, newTransaction];
    this.transactionsSubject.next(updated);
    this.updateBudgetUsage();

    return new Observable((observer) => {
      observer.next(newTransaction);
      observer.complete();
    });
  }

  // Xuất báo cáo ngân sách
  exportBudgetReport(month: string, year: number): Observable<Blob> {
    return combineLatest([this.budgets$, this.transactions$]).pipe(
      map(([budgets, transactions]) => {
        const filteredBudgets = budgets.filter(
          (b) => b.month === month && b.year === year,
        );
        const csvContent = this.generateBudgetCSV(
          filteredBudgets,
          transactions,
        );
        return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      }),
    );
    // return this.http.post(`${this.apiUrl}/budgets/export`, { month, year }, { responseType: 'blob' });
  }

  private generateBudgetCSV(
    budgets: Budget[],
    transactions: Transaction[],
  ): string {
    const headers = [
      'Danh mục',
      'Ngân sách (VND)',
      'Đã chi (VND)',
      'Còn lại (VND)',
      'Sử dụng (%)',
      'Trạng thái',
      'Số giao dịch',
      'Tháng/Năm',
    ];

    const csvRows = [
      headers.join(','),
      ...budgets.map((budget) => {
        const categoryTransactions = transactions.filter(
          (t) =>
            t.category === budget.category &&
            t.type === 'expense' &&
            new Date(t.date).getMonth() === parseInt(budget.month) - 1 &&
            new Date(t.date).getFullYear() === budget.year,
        );

        return [
          budget.category,
          budget.monthlyLimit,
          budget.currentSpent,
          budget.remainingAmount,
          budget.usagePercentage,
          budget.status === 'safe'
            ? 'An toàn'
            : budget.status === 'warning'
              ? 'Cảnh báo'
              : 'Vượt mức',
          categoryTransactions.length,
          `${budget.month}/${budget.year}`,
        ].join(',');
      }),
    ];

    return csvRows.join('\n');
  }
}
