import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabsModule } from 'primeng/tabs';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

// interface Time{
//   label:string,
//   value:string
// }
import {
  FinancialData,
  CategoryData,
  AccountData,
  ChartType,
} from '../../../core/model/interface/analytics';

@Component({
  selector: 'app-financial-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    AutoCompleteModule,
    ButtonModule,
    TableModule,
    ChartModule,
    DatePickerModule,
    InputTextModule,
    TabsModule,
    SelectModule,
    TagModule,
    ProgressBarModule,
    DialogModule,
    TooltipModule,
  ],
  templateUrl: './analytics.html',
  styleUrl: './analytics.css',
})
export class Analytics implements OnInit {
  // Filter Options
  timeOptions: any[] = [
    { label: 'Tháng này', value: 'thisMonth' },
    { label: 'Tháng trước', value: 'lastMonth' },
    { label: 'Quý này', value: 'thisQuarter' },
    { label: 'Năm này', value: 'thisYear' },
    { label: 'Tùy chọn', value: 'custom' },
  ];
  // timeOptions:string[] = ['sad', 'asdad', 'asdasdas'];

  categoryOptions: any[] = [
    { label: 'Tất cả danh mục', value: 'all' },
    { label: 'Ăn uống', value: 'food' },
    { label: 'Giải trí', value: 'entertainment' },
    { label: 'Giao thông', value: 'transport' },
    { label: 'Y tế', value: 'health' },
  ];

  accountOptions: any[] = [
    { label: 'Tất cả tài khoản', value: 'all' },
    { label: 'Tiền mặt', value: 'cash' },
    { label: 'Ngân hàng', value: 'bank' },
    { label: 'Ví điện tử', value: 'ewallet' },
  ];

  chartTypeOptions: any[] = [
    { label: 'Pie', value: 'pie' },
    { label: 'Doughnut', value: 'doughnut' },
  ];

  // Selected Values
  selectedTime = 'thisMonth';
  selectedCategory = 'all';
  selectedAccount = 'all';
  selectedChartType: ChartType = 'bar';

  items: any[] = [];
  serchTime(event: AutoCompleteCompleteEvent) {
    this.timeOptions = [
      { label: 'Tháng này', value: 'thisMonth' },
      { label: 'Tháng trước', value: 'lastMonth' },
      { label: 'Quý này', value: 'thisQuarter' },
      { label: 'Năm này', value: 'thisYear' },
      { label: 'Tùy chọn', value: 'custom' },
    ];
    // let _items = [...Array(10).keys()];
    // this.items = event.query
    //   ? [...Array(10).keys()].map((item) => event.query + '-' + item)
    //   : _items;
    // console.log(this.items);
    // this.items = this.timeOptions;
  }

  // Summary Data
  totalIncome = 15000000;
  totalExpense = 12000000;
  netBalance = 3000000;
  savingRate = 20;
  incomeGrowth = 15;
  expenseGrowth = 8;
  balanceGrowth = 25;

  // Chart Data
  chartData: any;
  chartOptions: any;
  pieChartData: any;
  pieChartOptions: any;

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

  ngOnInit() {
    this.initializeCharts();
  }

  initializeCharts() {
    // Line Chart for Income/Expense Trend
    this.chartData = {
      labels: ['T5/2025', 'T6/2025', 'T7/2025', 'T8/2025'],
      datasets: [
        {
          label: 'Thu nhập',
          data: [12000000, 14000000, 13000000, 15000000],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Chi tiêu',
          data: [9500000, 10500000, 11000000, 12000000],
          borderColor: '#ef4444',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: '#e2e8f0',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#94a3b8',
          },
          grid: {
            color: 'rgba(148, 163, 184, 0.2)',
          },
        },
        y: {
          ticks: {
            color: '#94a3b8',
            callback: function (value: any) {
              return (value / 1000000).toFixed(1) + 'M';
            },
          },
          grid: {
            color: 'rgba(148, 163, 184, 0.2)',
          },
        },
      },
    };

    // Pie Chart for Categories
    this.pieChartData = {
      labels: this.categoryData.map((cat) => cat.name),
      datasets: [
        {
          data: this.categoryData.map((cat) => cat.amount),
          backgroundColor: this.categoryData.map((cat) => cat.color),
          borderWidth: 2,
          borderColor: '#1e293b',
        },
      ],
    };

    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#e2e8f0',
            padding: 20,
          },
        },
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const value = context.parsed;
              const total = context.dataset.data.reduce(
                (a: number, b: number) => a + b,
                0,
              );
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${(value / 1000000).toFixed(1)}M VND (${percentage}%)`;
            },
          },
        },
      },
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

  refreshChart() {
    // Simulate data refresh
    this.initializeCharts();
  }

  exportToPDF() {
    console.log('Xuất báo cáo PDF...');
    // Implementation for PDF export
    alert('Chức năng xuất PDF đang được phát triển');
  }

  exportToExcel() {
    console.log('Xuất báo cáo Excel...');
    // Implementation for Excel export
    alert('Chức năng xuất Excel đang được phát triển');
  }
}
