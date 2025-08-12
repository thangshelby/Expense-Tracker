import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { SelectModule } from 'primeng/select';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { TooltipModule } from 'primeng/tooltip';
import { FormsModule } from '@angular/forms';
import { TabsModule } from 'primeng/tabs';
import { TableModule } from 'primeng/table';

import {
  FinancialData,
  CategoryData,
  AccountData,
} from '../../../core/model/interface/analytics';
interface ChartData {
  labels: string[];
  datasets: any[];
}

interface CategorySpending {
  category: string;
  amount: number;
  percentage: number;
  color: string;
}

interface FinancialSuggestion {
  type: 'warning' | 'success' | 'info';
  message: string;
  icon: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ChartModule,
    FormsModule,
    SelectModule,
    ButtonModule,
    TagModule,
    ProgressBarModule,
    TooltipModule,
    TabsModule,
    TableModule,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  // Time filter options
  timeOptions = [
    { label: 'Tuần này', value: 'week' },
    { label: 'Tháng này', value: 'month' },
    { label: 'Năm này', value: 'year' },
  ];
  selectedTime = 'month';

  // Summary data
  totalIncome = 15000000;
  totalExpense = 8500000;
  currentBalance = 6500000;
  savingRate = 43.3;
  incomeChange = 12.5;
  expenseChange = 8.2;
  balanceChange = 15.7;

  // Chart data
  cashFlowData: ChartData = {
    labels: [],
    datasets: [],
  };

  expenseCategoryData: ChartData = {
    labels: [],
    datasets: [],
  };

  // Chart options
  chartOptions: any;
  doughnutOptions: any;

  // Additional data
  topCategories: CategorySpending[] = [];
  accountSummary = [
    { name: 'Ví tiền mặt', balance: 2000000, icon: 'pi pi-wallet' },
    { name: 'Ngân hàng ACB', balance: 3500000, icon: 'pi pi-credit-card' },
    { name: 'Ví MoMo', balance: 1000000, icon: 'pi pi-mobile' },
  ];

  // Table Data
  monthlyData: FinancialData[] = [
    {
      month: 'Tháng 8/2025',
      income: 15000000,
      expense: 12000000,
      balance: 3000000,
    },
    {
      month: 'Tháng 7/2025',
      income: 13000000,
      expense: 11000000,
      balance: 2000000,
    },
    {
      month: 'Tháng 6/2025',
      income: 14000000,
      expense: 10500000,
      balance: 3500000,
    },
    {
      month: 'Tháng 5/2025',
      income: 12000000,
      expense: 9500000,
      balance: 2500000,
    },
  ];

  categoryData: CategoryData[] = [
    {
      name: 'Ăn uống',
      amount: 4000000,
      percentage: 33,
      color: '#ef4444',
      icon: '🍜',
    },
    {
      name: 'Giải trí',
      amount: 2500000,
      percentage: 21,
      color: '#3b82f6',
      icon: '🎬',
    },
    {
      name: 'Giao thông',
      amount: 2000000,
      percentage: 17,
      color: '#10b981',
      icon: '🚗',
    },
    {
      name: 'Y tế',
      amount: 1500000,
      percentage: 12,
      color: '#f59e0b',
      icon: '⚕️',
    },
    {
      name: 'Mua sắm',
      amount: 1000000,
      percentage: 8,
      color: '#8b5cf6',
      icon: '🛍️',
    },
    {
      name: 'Khác',
      amount: 1000000,
      percentage: 8,
      color: '#6b7280',
      icon: '📦',
    },
  ];

  accountData: AccountData[] = [
    {
      name: 'Ví tiền mặt',
      balance: 2000000,
      transactions: 45,
      type: 'Tiền mặt',
    },
    {
      name: 'Tài khoản VCB',
      balance: 8000000,
      transactions: 23,
      type: 'Ngân hàng',
    },
    { name: 'Ví MoMo', balance: 1500000, transactions: 67, type: 'Ví điện tử' },
    {
      name: 'Tài khoản TCB',
      balance: 5500000,
      transactions: 18,
      type: 'Ngân hàng',
    },
  ];

  financialSuggestions: FinancialSuggestion[] = [
    {
      type: 'warning',
      message:
        'Chi tiêu ăn uống tăng 25% so với tháng trước. Hãy cân nhắc nấu ăn tại nhà nhiều hơn.',
      icon: 'pi pi-exclamation-triangle',
    },
    {
      type: 'success',
      message: 'Tuyệt vời! Bạn đã tiết kiệm được 43% thu nhập tháng này.',
      icon: 'pi pi-check-circle',
    },
    {
      type: 'info',
      message: 'Hãy thiết lập một quỹ dự phòng khẩn cấp bằng 6 tháng chi tiêu.',
      icon: 'pi pi-info-circle',
    },
  ];

  Math = Math; // Make Math available in template

  ngOnInit() {
    this.initializeChartOptions();
    this.loadCashFlowData();
    this.loadExpenseCategoryData();
    this.loadTopCategories();
  }

  initializeChartOptions() {
    // Line chart options
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#9CA3AF',
          },
        },
      },
      scales: {
        x: {
          grid: {
            color: '#374151',
          },
          ticks: {
            color: '#9CA3AF',
          },
        },
        y: {
          grid: {
            color: '#374151',
          },
          ticks: {
            color: '#9CA3AF',
            callback: function (value: any) {
              return (value / 1000000).toFixed(1) + 'M VND';
            },
          },
        },
      },
    };

    // Doughnut chart options
    this.doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#9CA3AF',
            padding: 20,
          },
        },
      },
    };
  }

  loadCashFlowData() {
    const labels =
      this.selectedTime === 'week'
        ? ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
        : this.selectedTime === 'month'
          ? ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']
          : ['Q1', 'Q2', 'Q3', 'Q4'];

    const incomeData =
      this.selectedTime === 'week'
        ? [500000, 0, 2000000, 0, 1500000, 3000000, 0]
        : this.selectedTime === 'month'
          ? [3500000, 4200000, 3800000, 3500000]
          : [42000000, 45000000, 38000000, 40000000];

    const expenseData =
      this.selectedTime === 'week'
        ? [200000, 150000, 300000, 250000, 400000, 800000, 600000]
        : this.selectedTime === 'month'
          ? [2100000, 2300000, 2000000, 2100000]
          : [25000000, 27000000, 23000000, 24000000];

    this.cashFlowData = {
      labels: labels,
      datasets: [
        {
          label: 'Thu nhập',
          data: incomeData,
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Chi tiêu',
          data: expenseData,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  }

  getComparisonText(data: FinancialData): string {
    const change =
      ((data.balance - (data.previousMonthIncome || data.balance * 0.8)) /
        (data.previousMonthIncome || data.balance * 0.8)) *
      100;
    return change > 0 ? `+${change.toFixed(1)}%` : `${change.toFixed(1)}%`;
  }

  getComparisonSeverity(data: FinancialData): string {
    const change =
      ((data.balance - (data.previousMonthIncome || data.balance * 0.8)) /
        (data.previousMonthIncome || data.balance * 0.8)) *
      100;
    return change > 0 ? 'success' : 'danger';
  }
  getAccountSeverity(type: string): string {
    switch (type) {
      case 'Tiền mặt':
        return 'warning';
      case 'Ngân hàng':
        return 'success';
      case 'Ví điện tử':
        return 'info';
      default:
        return 'secondary';
    }
  }
  loadExpenseCategoryData() {
    this.expenseCategoryData = {
      labels: ['Ăn uống', 'Giao thông', 'Mua sắm', 'Giải trí', 'Y tế', 'Khác'],
      datasets: [
        {
          data: [3200000, 1500000, 2100000, 800000, 600000, 300000],
          backgroundColor: [
            '#EF4444',
            '#F59E0B',
            '#10B981',
            '#3B82F6',
            '#8B5CF6',
            '#6B7280',
          ],
          borderColor: '#1F2937',
          borderWidth: 2,
        },
      ],
    };
  }

  loadTopCategories() {
    this.topCategories = [
      {
        category: 'Ăn uống',
        amount: 3200000,
        percentage: 37.6,
        color: '#EF4444',
      },
      {
        category: 'Mua sắm',
        amount: 2100000,
        percentage: 24.7,
        color: '#10B981',
      },
      {
        category: 'Giao thông',
        amount: 1500000,
        percentage: 17.6,
        color: '#F59E0B',
      },
      {
        category: 'Giải trí',
        amount: 800000,
        percentage: 9.4,
        color: '#3B82F6',
      },
      { category: 'Y tế', amount: 600000, percentage: 7.1, color: '#8B5CF6' },
    ];
  }

  onTimeFilterChange(event: any) {
    this.selectedTime = event.value;
    this.loadCashFlowData();
    // Update other data based on time filter
    this.updateSummaryData();
  }

  updateSummaryData() {
    // Simulate data changes based on time filter
    const multiplier =
      this.selectedTime === 'week'
        ? 0.25
        : this.selectedTime === 'month'
          ? 1
          : 12;

    this.totalIncome = 15000000 * multiplier;
    this.totalExpense = 8500000 * multiplier;
    this.currentBalance = 6500000 * multiplier;
  }
}
