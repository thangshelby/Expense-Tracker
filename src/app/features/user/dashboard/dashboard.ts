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
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { MenuModule } from 'primeng/menu';
import { DatePickerModule } from 'primeng/datepicker';

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
  type: 'warning' | 'success' | 'info' | 'danger';
  message: string;
  icon: string;
  priority: 'high' | 'medium' | 'low';
}

interface BudgetItem {
  category: string;
  budgeted: number;
  spent: number;
  remaining: number;
  percentage: number;
  status: 'good' | 'warning' | 'danger';
}

interface GoalItem {
  name: string;
  target: number;
  current: number;
  deadline: string;
  progress: number;
  status: 'on-track' | 'behind' | 'ahead';
}

interface Transaction {
  id: string;
  date: Date;
  description: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  account: string;
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
    InputTextModule,
    DialogModule,
    MenuModule,
    DatePickerModule,
  ],
  templateUrl: './dashboard.html',
})
export class Dashboard implements OnInit {
  // Time filter options
  timeOptions = [
    { label: 'Tuần này', value: 'week' },
    { label: 'Tháng này', value: 'month' },
    { label: 'Quý này', value: 'quarter' },
    { label: 'Năm này', value: 'year' },
    { label: 'Tùy chỉnh', value: 'custom' },
  ];
  selectedTime = 'month';
  customDateRange: Date[] = [];

  // Enhanced summary data
  totalIncome = 25000000;
  totalExpense = 18500000;
  currentBalance = 45000000;
  netWorth = 85000000;
  savingRate = 26.0;
  incomeChange = 15.2;
  expenseChange = 8.7;
  balanceChange = 22.3;
  netWorthChange = 12.8;
  healthScore = 78;

  // Financial metrics
  totalAssets = 95000000;
  totalDebt = 10000000;
  debtToIncomeRatio = 15.5;
  emergencyFundMonths = 3.2;
  investmentRate = 18.5;
  totalInvestmentValue = 28000000;
  totalInvestmentReturn = 8.7;

  // Analysis options
  expenseAnalysisType = 'category';
  transactionFilter = 'all';
  spendingPeriod = '30d';

  // Dialog states
  showAddTransaction = false;

  // New transaction form
  newTransaction = {
    type: '',
    amount: 0,
    description: '',
    category: '',
    account: '',
  };

  transactionCategories = [
    { label: 'Ăn uống', value: 'food' },
    { label: 'Giao thông', value: 'transport' },
    { label: 'Giải trí', value: 'entertainment' },
    { label: 'Mua sắm', value: 'shopping' },
    { label: 'Y tế', value: 'healthcare' },
    { label: 'Giáo dục', value: 'education' },
    { label: 'Lương', value: 'salary' },
    { label: 'Đầu tư', value: 'investment' },
  ];

  accountOptions = [
    { label: 'Ví tiền mặt', value: 'cash' },
    { label: 'Ngân hàng VCB', value: 'vcb' },
    { label: 'Ví MoMo', value: 'momo' },
    { label: 'Tài khoản TCB', value: 'tcb' },
  ];

  // Chart data
  cashFlowData: ChartData = { labels: [], datasets: [] };
  expenseCategoryData: ChartData = { labels: [], datasets: [] };
  incomeTrendData: ChartData = { labels: [], datasets: [] };
  expenseTrendData: ChartData = { labels: [], datasets: [] };
  predictiveData: ChartData = { labels: [], datasets: [] };
  investmentChartData: ChartData = { labels: [], datasets: [] };

  // Chart options
  chartOptions: any;
  doughnutOptions: any;
  trendChartOptions: any;
  predictiveChartOptions: any;
  investmentChartOptions: any;

  // Enhanced data
  budgetData: BudgetItem[] = [
    {
      category: 'Ăn uống',
      budgeted: 5000000,
      spent: 4200000,
      remaining: 800000,
      percentage: 84,
      status: 'warning',
    },
    {
      category: 'Giao thông',
      budgeted: 2000000,
      spent: 1500000,
      remaining: 500000,
      percentage: 75,
      status: 'good',
    },
    {
      category: 'Giải trí',
      budgeted: 3000000,
      spent: 3200000,
      remaining: -200000,
      percentage: 107,
      status: 'danger',
    },
    {
      category: 'Mua sắm',
      budgeted: 2500000,
      spent: 1800000,
      remaining: 700000,
      percentage: 72,
      status: 'good',
    },
  ];

  financialGoals: GoalItem[] = [
    {
      name: 'Quỹ khẩn cấp',
      target: 50000000,
      current: 35000000,
      deadline: '31/12/2025',
      progress: 70,
      status: 'on-track',
    },
    {
      name: 'Mua xe ô tô',
      target: 800000000,
      current: 150000000,
      deadline: '30/06/2026',
      progress: 19,
      status: 'behind',
    },
    {
      name: 'Du lịch Châu Âu',
      target: 80000000,
      current: 95000000,
      deadline: '15/08/2025',
      progress: 119,
      status: 'ahead',
    },
  ];

  enhancedAccountData = [
    {
      name: 'Ví tiền mặt',
      balance: 3500000,
      transactions: 67,
      type: 'Tiền mặt',
      bank: 'Cash',
      color: '#10B981',
      icon: 'pi pi-wallet',
      monthlyChange: 5.2,
      interestRate: 0,
      status: 'active',
    },
    {
      name: 'Tài khoản VCB',
      balance: 25000000,
      transactions: 34,
      type: 'Ngân hàng',
      bank: 'Vietcombank',
      color: '#3B82F6',
      icon: 'pi pi-building',
      monthlyChange: 12.8,
      interestRate: 0.5,
      status: 'active',
    },
    {
      name: 'Ví MoMo',
      balance: 2800000,
      transactions: 89,
      type: 'Ví điện tử',
      bank: 'MoMo',
      color: '#EC4899',
      icon: 'pi pi-mobile',
      monthlyChange: -2.1,
      interestRate: 0,
      status: 'active',
    },
    {
      name: 'Tài khoản TCB',
      balance: 13700000,
      transactions: 23,
      type: 'Tiết kiệm',
      bank: 'Techcombank',
      color: '#F59E0B',
      icon: 'pi pi-credit-card',
      monthlyChange: 8.9,
      interestRate: 4.5,
      status: 'active',
    },
  ];

  investmentPortfolio = [
    {
      name: 'VN-Index ETF',
      type: 'ETF',
      value: 12000000,
      return: 12.5,
      color: '#10B981',
    },
    {
      name: 'Cổ phiếu VIC',
      type: 'Cổ phiếu',
      value: 8500000,
      return: -3.2,
      color: '#EF4444',
    },
    {
      name: 'Trái phiếu chính phủ',
      type: 'Trái phiếu',
      value: 5000000,
      return: 6.8,
      color: '#3B82F6',
    },
    {
      name: 'Vàng SJC',
      type: 'Kim loại quý',
      value: 2500000,
      return: 15.7,
      color: '#F59E0B',
    },
  ];

  recentTransactions: Transaction[] = [
    {
      id: '1',
      date: new Date(),
      description: 'Lương tháng 8',
      category: 'Lương',
      amount: 25000000,
      type: 'income',
      account: 'VCB',
    },
    {
      id: '2',
      date: new Date(),
      description: 'Ăn trưa quán cơm',
      category: 'Ăn uống',
      amount: 45000,
      type: 'expense',
      account: 'MoMo',
    },
    {
      id: '3',
      date: new Date(),
      description: 'Xăng xe máy',
      category: 'Giao thông',
      amount: 120000,
      type: 'expense',
      account: 'Cash',
    },
    {
      id: '4',
      date: new Date(),
      description: 'Cổ tức VIC',
      category: 'Đầu tư',
      amount: 2500000,
      type: 'income',
      account: 'VCB',
    },
    {
      id: '5',
      date: new Date(),
      description: 'Mua sách kỹ thuật',
      category: 'Giáo dục',
      amount: 350000,
      type: 'expense',
      account: 'VCB',
    },
  ];

  aiInsights = [
    {
      type: 'warning',
      title: 'Chi tiêu giải trí tăng đột biến',
      message:
        'Chi tiêu giải trí tháng này tăng 45% so với tháng trước. Hãy xem xét điều chỉnh để đạt mục tiêu tiết kiệm.',
      icon: 'pi pi-exclamation-triangle',
      priority: 'high',
      actionable: true,
      actionText: 'Xem chi tiết',
    },
    {
      type: 'opportunity',
      title: 'Cơ hội đầu tư tốt',
      message:
        'Dựa trên profile rủi ro và mục tiêu tài chính, bạn có thể cân nhắc tăng tỷ lệ đầu tư lên 25%.',
      icon: 'pi pi-trending-up',
      priority: 'medium',
      actionable: true,
      actionText: 'Tìm hiểu thêm',
    },
    {
      type: 'prediction',
      title: 'Dự đoán tiết kiệm cuối năm',
      message:
        'Với xu hướng hiện tại, bạn sẽ tiết kiệm được 180 triệu VND vào cuối năm 2025.',
      icon: 'pi pi-chart-line',
      priority: 'low',
      actionable: false,
      actionText: '',
    },
    {
      type: 'insight',
      title: 'Pattern chi tiêu cuối tuần',
      message:
        'Chi tiêu cuối tuần của bạn cao hơn 35% so với ngày thường, chủ yếu ở danh mục giải trí và ăn uống.',
      icon: 'pi pi-calendar',
      priority: 'medium',
      actionable: true,
      actionText: 'Lập kế hoạch',
    },
  ];

  quickActions = [
    {
      title: 'Tạo ngân sách mới',
      description: 'Thiết lập ngân sách cho tháng tới',
      icon: 'pi pi-plus-circle',
    },
    {
      title: 'Phân tích chi tiêu',
      description: 'Xem báo cáo chi tiêu chi tiết',
      icon: 'pi pi-chart-bar',
    },
    {
      title: 'Đặt mục tiêu tiết kiệm',
      description: 'Thiết lập mục tiêu tài chính mới',
      icon: 'pi pi-flag',
    },
    {
      title: 'Tối ưu hóa đầu tư',
      description: 'Nhận tư vấn danh mục đầu tư',
      icon: 'pi pi-cog',
    },
  ];

  savingOpportunities = [
    {
      category: 'Ăn uống',
      potential: 800000,
      suggestion: 'Nấu ăn tại nhà 3 bữa/tuần có thể tiết kiệm ~800k/tháng',
    },
    {
      category: 'Giao thông',
      potential: 400000,
      suggestion: 'Sử dụng xe bus thay vì Grab có thể tiết kiệm ~400k/tháng',
    },
    {
      category: 'Giải trí',
      potential: 600000,
      suggestion: 'Giảm 2 lần đi xem phim/tháng để tiết kiệm ~600k',
    },
  ];

  // Additional data
  topCategories: CategorySpending[] = [
    {
      category: 'Ăn uống',
      amount: 4200000,
      percentage: 22.7,
      color: '#EF4444',
    },
    {
      category: 'Giao thông',
      amount: 2800000,
      percentage: 15.1,
      color: '#F59E0B',
    },
    {
      category: 'Giải trí',
      amount: 3200000,
      percentage: 17.3,
      color: '#3B82F6',
    },
    { category: 'Mua sắm', amount: 1800000, percentage: 9.7, color: '#10B981' },
    { category: 'Y tế', amount: 1200000, percentage: 6.5, color: '#8B5CF6' },
  ];

  accountSummary = [
    {
      name: 'Ví tiền mặt',
      balance: 3500000,
      icon: 'pi pi-wallet',
      type: 'Tiền mặt',
      currency: 'VND',
    },
    {
      name: 'Ngân hàng VCB',
      balance: 25000000,
      icon: 'pi pi-building',
      type: 'Tài khoản chính',
      currency: 'VND',
    },
    {
      name: 'Ví MoMo',
      balance: 2800000,
      icon: 'pi pi-mobile',
      type: 'Ví điện tử',
      currency: 'VND',
    },
    {
      name: 'Tài khoản TCB',
      balance: 13700000,
      icon: 'pi pi-credit-card',
      type: 'Tiết kiệm',
      currency: 'VND',
    },
  ];

  // Enhanced Table Data
  monthlyData: FinancialData[] = [
    {
      month: 'Tháng 8/2025',
      income: 27000000,
      expense: 18500000,
      balance: 8500000,
    },
    {
      month: 'Tháng 7/2025',
      income: 25000000,
      expense: 17200000,
      balance: 7800000,
    },
    {
      month: 'Tháng 6/2025',
      income: 24000000,
      expense: 16800000,
      balance: 7200000,
    },
    {
      month: 'Tháng 5/2025',
      income: 23000000,
      expense: 15500000,
      balance: 7500000,
    },
    {
      month: 'Tháng 4/2025',
      income: 22500000,
      expense: 16200000,
      balance: 6300000,
    },
    {
      month: 'Tháng 3/2025',
      income: 21000000,
      expense: 15800000,
      balance: 5200000,
    },
  ];

  categoryData: CategoryData[] = [
    {
      name: 'Ăn uống',
      amount: 4200000,
      percentage: 23,
      color: '#ef4444',
      icon: '🍜',
    },
    {
      name: 'Giao thông',
      amount: 2800000,
      percentage: 15,
      color: '#f59e0b',
      icon: '🚗',
    },
    {
      name: 'Giải trí',
      amount: 3200000,
      percentage: 17,
      color: '#3b82f6',
      icon: '🎬',
    },
    {
      name: 'Mua sắm',
      amount: 1800000,
      percentage: 10,
      color: '#10b981',
      icon: '🛍️',
    },
    {
      name: 'Y tế',
      amount: 1200000,
      percentage: 6,
      color: '#8b5cf6',
      icon: '⚕️',
    },
    {
      name: 'Giáo dục',
      amount: 2300000,
      percentage: 12,
      color: '#06b6d4',
      icon: '📚',
    },
    {
      name: 'Khác',
      amount: 3000000,
      percentage: 17,
      color: '#6b7280',
      icon: '📦',
    },
  ];

  accountData: AccountData[] = [
    {
      name: 'Ví tiền mặt',
      balance: 3500000,
      transactions: 67,
      type: 'Tiền mặt',
    },
    {
      name: 'Tài khoản VCB',
      balance: 25000000,
      transactions: 34,
      type: 'Ngân hàng',
    },
    { name: 'Ví MoMo', balance: 2800000, transactions: 89, type: 'Ví điện tử' },
    {
      name: 'Tài khoản TCB',
      balance: 13700000,
      transactions: 23,
      type: 'Tiết kiệm',
    },
  ];

  financialSuggestions: FinancialSuggestion[] = [
    {
      type: 'warning',
      message:
        'Chi tiêu ăn uống tăng 25% so với tháng trước. Hãy cân nhắc nấu ăn tại nhà nhiều hơn.',
      icon: 'pi pi-exclamation-triangle',
      priority: 'high',
    },
    {
      type: 'success',
      message:
        'Tuyệt vời! Bạn đã tiết kiệm được 34% thu nhập tháng này, vượt mục tiêu đề ra.',
      icon: 'pi pi-check-circle',
      priority: 'low',
    },
    {
      type: 'info',
      message:
        'Hãy thiết lập một quỹ dự phòng khẩn cấp bằng 6 tháng chi tiêu (khoảng 111 triệu).',
      icon: 'pi pi-info-circle',
      priority: 'medium',
    },
    {
      type: 'danger',
      message:
        'Chi tiêu giải trí vượt ngân sách 15%. Cần điều chỉnh ngay để tránh ảnh hưởng mục tiêu.',
      icon: 'pi pi-times-circle',
      priority: 'high',
    },
  ];

  Math = Math; // Make Math available in template

  ngOnInit() {
    this.initializeChartOptions();
    this.loadAllChartData();
  }

  initializeChartOptions() {
    const baseGridColor = '#374151';
    const baseLabelColor = '#9CA3AF';

    // Enhanced line chart options
    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      plugins: {
        legend: {
          labels: {
            color: baseLabelColor,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: '#1F2937',
          titleColor: '#F9FAFB',
          bodyColor: '#F9FAFB',
          borderColor: '#374151',
          borderWidth: 1,
        },
      },
      scales: {
        x: {
          grid: {
            color: baseGridColor,
            drawBorder: false,
          },
          ticks: {
            color: baseLabelColor,
          },
        },
        y: {
          grid: {
            color: baseGridColor,
            drawBorder: false,
          },
          ticks: {
            color: baseLabelColor,
            callback: function (value: any) {
              return (value / 1000000).toFixed(1) + 'M VND';
            },
          },
        },
      },
    };

    // Enhanced doughnut chart options
    this.doughnutOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: baseLabelColor,
            padding: 15,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: '#1F2937',
          titleColor: '#F9FAFB',
          bodyColor: '#F9FAFB',
        },
      },
      cutout: '60%',
    };

    // Trend chart options
    this.trendChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#1F2937',
          titleColor: '#F9FAFB',
          bodyColor: '#F9FAFB',
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            color: baseLabelColor,
          },
        },
        y: {
          grid: {
            color: baseGridColor,
          },
          ticks: {
            color: baseLabelColor,
            callback: function (value: any) {
              return (value / 1000000).toFixed(1) + 'M';
            },
          },
        },
      },
    };

    // Predictive chart options
    this.predictiveChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: baseLabelColor,
          },
        },
        tooltip: {
          backgroundColor: '#1F2937',
          titleColor: '#F9FAFB',
          bodyColor: '#F9FAFB',
        },
      },
      scales: {
        x: {
          grid: {
            color: baseGridColor,
          },
          ticks: {
            color: baseLabelColor,
          },
        },
        y: {
          grid: {
            color: baseGridColor,
          },
          ticks: {
            color: baseLabelColor,
            callback: function (value: any) {
              return (value / 1000000).toFixed(1) + 'M';
            },
          },
        },
      },
    };

    // Investment chart options
    this.investmentChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: baseLabelColor,
            padding: 10,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: '#1F2937',
          titleColor: '#F9FAFB',
          bodyColor: '#F9FAFB',
        },
      },
      cutout: '45%',
    };
  }

  loadAllChartData() {
    this.loadCashFlowData();
    this.loadExpenseCategoryData();
    this.loadTrendData();
    this.loadPredictiveData();
    this.loadInvestmentData();
  }

  loadCashFlowData() {
    const labels =
      this.selectedTime === 'week'
        ? ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
        : this.selectedTime === 'month'
          ? ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4']
          : this.selectedTime === 'quarter'
            ? ['Tháng 1', 'Tháng 2', 'Tháng 3']
            : ['Q1', 'Q2', 'Q3', 'Q4'];

    const incomeData =
      this.selectedTime === 'week'
        ? [800000, 200000, 2500000, 300000, 1800000, 3200000, 500000]
        : this.selectedTime === 'month'
          ? [6500000, 7200000, 6800000, 6500000]
          : this.selectedTime === 'quarter'
            ? [24000000, 25000000, 27000000]
            : [72000000, 75000000, 68000000, 73000000];

    const expenseData =
      this.selectedTime === 'week'
        ? [350000, 280000, 420000, 380000, 650000, 1200000, 800000]
        : this.selectedTime === 'month'
          ? [4200000, 4800000, 4500000, 5000000]
          : this.selectedTime === 'quarter'
            ? [16800000, 17200000, 18500000]
            : [50400000, 52000000, 49500000, 53000000];

    this.cashFlowData = {
      labels: labels,
      datasets: [
        {
          label: 'Thu nhập',
          data: incomeData,
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#10B981',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        },
        {
          label: 'Chi tiêu',
          data: expenseData,
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true,
          pointBackgroundColor: '#EF4444',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
        },
      ],
    };
  }

  loadExpenseCategoryData() {
    this.expenseCategoryData = {
      labels: [
        'Ăn uống',
        'Giao thông',
        'Giải trí',
        'Mua sắm',
        'Y tế',
        'Giáo dục',
        'Khác',
      ],
      datasets: [
        {
          data: [4200000, 2800000, 3200000, 1800000, 1200000, 2300000, 3000000],
          backgroundColor: [
            '#EF4444',
            '#F59E0B',
            '#3B82F6',
            '#10B981',
            '#8B5CF6',
            '#06B6D4',
            '#6B7280',
          ],
          borderColor: '#1F2937',
          borderWidth: 3,
        },
      ],
    };
  }

  loadTrendData() {
    const months = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'];

    this.incomeTrendData = {
      labels: months,
      datasets: [
        {
          data: [
            21000000, 22500000, 21000000, 22500000, 23000000, 24000000,
            25000000, 27000000,
          ],
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
          borderColor: '#10B981',
          borderWidth: 2,
        },
      ],
    };

    this.expenseTrendData = {
      labels: months,
      datasets: [
        {
          data: [
            15800000, 16200000, 15800000, 16200000, 15500000, 16800000,
            17200000, 18500000,
          ],
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: '#EF4444',
          borderWidth: 2,
        },
      ],
    };
  }

  loadPredictiveData() {
    const futureMonths = ['T9', 'T10', 'T11', 'T12', 'T1/26', 'T2/26'];

    this.predictiveData = {
      labels: futureMonths,
      datasets: [
        {
          label: 'Dự đoán thu nhập',
          data: [28000000, 29000000, 30000000, 32000000, 28000000, 29000000],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderDash: [5, 5],
          tension: 0.4,
        },
        {
          label: 'Dự đoán chi tiêu',
          data: [19000000, 19500000, 21000000, 22000000, 18500000, 19000000],
          borderColor: '#EF4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          borderDash: [5, 5],
          tension: 0.4,
        },
        {
          label: 'Mục tiêu tiết kiệm',
          data: [8000000, 8500000, 9000000, 10000000, 8000000, 8500000],
          borderColor: '#3B82F6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          borderDash: [10, 3],
          tension: 0.4,
        },
      ],
    };
  }

  loadInvestmentData() {
    this.investmentChartData = {
      labels: ['VN-Index ETF', 'Cổ phiếu VIC', 'Trái phiếu CP', 'Vàng SJC'],
      datasets: [
        {
          data: [12000000, 8500000, 5000000, 2500000],
          backgroundColor: ['#10B981', '#EF4444', '#3B82F6', '#F59E0B'],
          borderColor: '#1F2937',
          borderWidth: 3,
        },
      ],
    };
  }

  // Event handlers
  onTimeFilterChange(event: any) {
    this.selectedTime = event.value;
    this.loadCashFlowData();
    this.updateSummaryData();
  }

  onCustomDateChange(event: any) {
    if (event && event.length === 2) {
      this.customDateRange = event;
      this.selectedTime = 'custom';
      // Load data based on custom date range
      this.loadCashFlowData();
    }
  }

  updateSummaryData() {
    const multiplier =
      this.selectedTime === 'week'
        ? 0.25
        : this.selectedTime === 'month'
          ? 1
          : this.selectedTime === 'quarter'
            ? 3
            : 12;

    this.totalIncome = 25000000 * multiplier;
    this.totalExpense = 18500000 * multiplier;
    this.currentBalance = this.currentBalance; // Keep current balance unchanged
  }

  // Helper methods
  getTotalBalance(): number {
    return this.accountSummary.reduce(
      (total, account) => total + account.balance,
      0,
    );
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
      case 'Tiết kiệm':
        return 'help';
      default:
        return 'secondary';
    }
  }

  getMonthRating(data: FinancialData): string {
    const savingRate = (data.balance / data.income) * 100;
    if (savingRate >= 30) return 'Xuất sắc';
    if (savingRate >= 20) return 'Tốt';
    if (savingRate >= 10) return 'Trung bình';
    return 'Cần cải thiện';
  }

  getMonthSeverity(data: FinancialData): string {
    const savingRate = (data.balance / data.income) * 100;
    if (savingRate >= 30) return 'success';
    if (savingRate >= 20) return 'info';
    if (savingRate >= 10) return 'warning';
    return 'danger';
  }

  // Transaction management
  addTransaction() {
    if (
      this.newTransaction.type &&
      this.newTransaction.amount &&
      this.newTransaction.description
    ) {
      const transaction: Transaction = {
        id: Date.now().toString(),
        date: new Date(),
        description: this.newTransaction.description,
        category: this.newTransaction.category,
        amount: this.newTransaction.amount,
        type: this.newTransaction.type as 'income' | 'expense',
        account: this.newTransaction.account,
      };

      this.recentTransactions.unshift(transaction);

      // Update summary data
      if (transaction.type === 'income') {
        this.totalIncome += transaction.amount;
      } else {
        this.totalExpense += transaction.amount;
      }

      // Reset form
      this.newTransaction = {
        type: '',
        amount: 0,
        description: '',
        category: '',
        account: '',
      };

      this.showAddTransaction = false;

      // Reload chart data
      this.loadAllChartData();
    }
  }
}
