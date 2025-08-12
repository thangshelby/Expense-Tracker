// budget-management.component.ts
import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';

import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TooltipModule } from 'primeng/tooltip';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChartModule } from 'primeng/chart';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DatePickerModule } from 'primeng/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {
  months,
  categories,
  budgets,
} from '../../../core/constants/bugget-management';
import {
  Budget,
  BudgetAlert,
  Transaction,
} from '../../../core/model/interface/budget-management';
@Component({
  selector: 'app-budget-management',
  templateUrl: './budget-management.html',
  styleUrl: './budget-management.css',
  imports: [
    CommonModule,
    FormsModule,
    DatePipe,
    ButtonModule,
    DialogModule,
    InputTextModule,
    InputNumberModule,
    TagModule,
    ToastModule,
    ConfirmDialogModule,
    TooltipModule,
    MenuModule,
    ProgressBarModule,
    ChartModule,
    CardModule,
    DividerModule,
    DatePickerModule,
    AutoCompleteModule,
  ],
})
export class BudgetManagement implements OnInit {
  budgets: Budget[] = [];
  alerts: BudgetAlert[] = [];
  transactions: Transaction[] = [];
  months = months;
  categories = categories;
  displayDialog: boolean = false;
  displayAlertDialog: boolean = false;
  displaySuggestionDialog: boolean = false;

  selectedBudget: Budget = {} as Budget;
  newBudget: Budget = {} as Budget;
  isEditing: boolean = false;

  getBudgetExceeded(budget: Budget) {
    return this.formatCurrency(Math.abs(budget.remainingAmount));
  }

  getAlert() {
    return this.alerts.filter((alert) => !alert.isRead).length;
  }

  // Statistics
  totalBudget: number = 0;
  totalSpent: number = 0;
  totalRemaining: number = 0;
  averageUsage: number = 0;

  // Current month/year
  currentMonth: string = '';
  currentYear: number = new Date().getFullYear();
  currentDate = new Date();

  items: MenuItem[] | undefined;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Chỉnh sửa',
        icon: 'pi pi-pencil',
        command: () => this.showEditDialog(this.budgets[0]),
      },
      {
        label: 'Xóa',
        icon: 'pi pi-trash',
        command: () => this.deleteBudget(this.budgets[0]),
      },
    ];
    this.currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
    this.loadData();
    this.loadTransactions();
    this.calculateBudgetUsage();
    this.calculateStatistics();
    this.checkBudgetAlerts();
  }

  loadData() {
    // Mock budget data
    this.budgets = budgets;
  }

  loadTransactions() {
    // Mock transaction data
    this.transactions = [
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
        amount: 90000,
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
        name: 'Medicine',
        amount: 180000,
        category: 'Healthcare',
        date: new Date(),
        type: 'expense',
      },
    ];
  }

  calculateBudgetUsage() {
    this.budgets.forEach((budget) => {
      const categoryTransactions = this.transactions.filter(
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
  }

  calculateStatistics() {
    this.totalBudget = this.budgets.reduce(
      (sum, budget) => sum + budget.monthlyLimit,
      0,
    );
    this.totalSpent = this.budgets.reduce(
      (sum, budget) => sum + budget.currentSpent,
      0,
    );
    this.totalRemaining = this.totalBudget - this.totalSpent;
    this.averageUsage =
      this.budgets.length > 0
        ? Math.round(
            this.budgets.reduce(
              (sum, budget) => sum + budget.usagePercentage,
              0,
            ) / this.budgets.length,
          )
        : 0;
  }

  checkBudgetAlerts() {
    this.alerts = [];
    let alertId = 1;

    this.budgets.forEach((budget) => {
      if (budget.status === 'exceeded') {
        this.alerts.push({
          id: alertId++,
          budgetId: budget.id,
          category: budget.category,
          type: 'exceeded',
          message: `Bạn đã vượt ngân sách ${this.getCategoryLabel(budget.category)} ${this.formatCurrency(Math.abs(budget.remainingAmount))}`,
          threshold: 100,
          currentAmount: budget.currentSpent,
          date: new Date(),
          isRead: false,
        });
      } else if (budget.status === 'warning') {
        this.alerts.push({
          id: alertId++,
          budgetId: budget.id,
          category: budget.category,
          type: 'warning',
          message: `Cảnh báo: Bạn đã sử dụng ${budget.usagePercentage}% ngân sách ${this.getCategoryLabel(budget.category)}`,
          threshold: 80,
          currentAmount: budget.currentSpent,
          date: new Date(),
          isRead: false,
        });
      }
    });
  }

  showAddDialog() {
    this.newBudget = {
      id: 0,
      category: '',
      categoryIcon: '',
      monthlyLimit: 0,
      currentSpent: 0,
      remainingAmount: 0,
      usagePercentage: 0,
      status: 'safe',
      month: this.currentMonth,
      year: this.currentYear,
      createdDate: new Date(),
      lastUpdated: new Date(),
    };
    this.isEditing = false;
    this.displayDialog = true;
  }

  showEditDialog(budget: Budget) {
    this.newBudget = { ...budget };
    this.isEditing = true;
    this.displayDialog = true;
  }

  showAlertDialog() {
    this.displayAlertDialog = true;
  }

  showSuggestionDialog() {
    this.displaySuggestionDialog = true;
  }

  saveBudget() {
    if (this.newBudget.category && this.newBudget.monthlyLimit > 0) {
      const categoryInfo = this.categories.find(
        (cat) => cat.value === this.newBudget.category,
      );
      if (categoryInfo) {
        this.newBudget.categoryIcon = categoryInfo.icon;
      }

      if (this.isEditing) {
        const index = this.budgets.findIndex(
          (budget) => budget.id === this.newBudget.id,
        );
        if (index !== -1) {
          this.budgets[index] = { ...this.newBudget };
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Cập nhật ngân sách thành công!',
          });
        }
      } else {
        // Check if budget for this category already exists
        const existingBudget = this.budgets.find(
          (budget) =>
            budget.category === this.newBudget.category &&
            budget.month === this.newBudget.month &&
            budget.year === this.newBudget.year,
        );

        if (existingBudget) {
          this.messageService.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: 'Ngân sách cho danh mục này đã tồn tại!',
          });
          return;
        }

        this.newBudget.id =
          Math.max(...this.budgets.map((budget) => budget.id), 0) + 1;
        this.budgets.push({ ...this.newBudget });
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Thêm ngân sách mới thành công!',
        });
      }

      this.calculateBudgetUsage();
      this.calculateStatistics();
      this.checkBudgetAlerts();
      this.displayDialog = false;
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Vui lòng điền đầy đủ thông tin!',
      });
    }
  }

  deleteBudget(budget: Budget) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa ngân sách này?',
      header: 'Xác nhận xóa',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.budgets = this.budgets.filter((b) => b.id !== budget.id);
        this.calculateStatistics();
        this.checkBudgetAlerts();
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Xóa ngân sách thành công!',
        });
      },
    });
  }

  markAlertAsRead(alert: BudgetAlert) {
    alert.isRead = true;
  }

  clearAllAlerts() {
    this.alerts = this.alerts.map((alert) => ({ ...alert, isRead: true }));
    this.messageService.add({
      severity: 'info',
      summary: 'Thông báo',
      detail: 'Đã đánh dấu tất cả cảnh báo là đã đọc!',
    });
  }

  getProgressBarColor(status: string): string {
    switch (status) {
      case 'safe':
        return '#10b981';
      case 'warning':
        return '#f59e0b';
      case 'exceeded':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'safe':
        return 'success';
      case 'warning':
        return 'warning';
      case 'exceeded':
        return 'danger';
      default:
        return 'info';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'safe':
        return 'An toàn';
      case 'warning':
        return 'Cảnh báo';
      case 'exceeded':
        return 'Vượt mức';
      default:
        return status;
    }
  }

  getCategoryLabel(category: string): string {
    const categoryInfo = this.categories.find((cat) => cat.value === category);
    return categoryInfo ? categoryInfo.label : category;
  }

  formatCurrency(amount: number): string {
    return Math.abs(amount).toLocaleString('vi-VN') + ' VND';
  }

  formatPercentage(percentage: number): string {
    return Math.min(percentage, 100) + '%';
  }

  getBudgetSuggestions(): string[] {
    const suggestions = [];

    if (this.averageUsage > 85) {
      suggestions.push('Xem xét tăng tổng ngân sách hoặc cắt giảm chi tiêu');
    }

    const exceededBudgets = this.budgets.filter((b) => b.status === 'exceeded');
    if (exceededBudgets.length > 0) {
      suggestions.push(
        `Có ${exceededBudgets.length} danh mục vượt ngân sách, cần điều chỉnh`,
      );
    }

    const lowUsageBudgets = this.budgets.filter((b) => b.usagePercentage < 50);
    if (lowUsageBudgets.length > 0) {
      suggestions.push(
        `Có thể giảm ngân sách cho: ${lowUsageBudgets.map((b) => this.getCategoryLabel(b.category)).join(', ')}`,
      );
    }

    if (suggestions.length === 0) {
      suggestions.push('Ngân sách của bạn đang được quản lý tốt!');
    }

    return suggestions;
  }
  getBudgetsStatusCount(status: 'safe' | 'warning' | 'exceeded'): number {
    return this.budgets?.filter((b) => b.status === status).length || 0;
  }

  formatExceededAmount(budget: Budget): string {
    return this.formatCurrency(Math.abs(budget.remainingAmount));
  }
  findIcon(newBudget: Budget) {
    return this.categories.find((c) => c.value === newBudget.category)?.icon;
  }

  onMonthYearChange() {
    this.loadData();
    this.calculateBudgetUsage();
    this.calculateStatistics();
    this.checkBudgetAlerts();
  }
}
