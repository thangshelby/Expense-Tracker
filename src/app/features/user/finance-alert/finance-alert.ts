import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { FormsModule } from '@angular/forms';
// PrimeNG Imports - Updated for Angular 20
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputNumberModule } from 'primeng/inputnumber';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { TimelineModule } from 'primeng/timeline';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

interface AlertRule {
  id: string;
  name: string;
  type: 'budget' | 'debt' | 'recurring' | 'inactivity';
  category?: string;
  threshold?: number;
  frequency: string;
  isActive: boolean;
  conditions: any;
  actions: string[];
  createdDate: Date;
  lastTriggered?: Date;
}

interface AlertHistory {
  id: string;
  ruleName: string;
  type: 'budget' | 'debt' | 'recurring' | 'inactivity';
  severity: 'info' | 'warning' | 'danger';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  actionTaken?: string;
}

interface BudgetAlert {
  category: string;
  budgetAmount: number;
  spentAmount: number;
  percentage: number;
  daysLeft: number;
  status: 'safe' | 'warning' | 'danger';
}

interface DebtReminder {
  id: string;
  creditor: string;
  amount: number;
  dueDate: Date;
  daysUntilDue: number;
  type: string;
  status: 'upcoming' | 'due' | 'overdue';
}

@Component({
  selector: 'app-financial-alerts',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    TabsModule,
    DialogModule,
    ToastModule,
    TableModule,
    TagModule,
    SelectModule,
    DatePickerModule,
    ToggleSwitchModule,
    AutoCompleteModule,
    InputNumberModule,
    SelectButtonModule,
    ProgressBarModule,
    ChipModule,
    DividerModule,
    BadgeModule,
    TimelineModule,
    ConfirmDialogModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './finance-alert.html',
  styleUrl: './finance-alert.css',
})
export class FinancialAlertsComponent implements OnInit {
  // Forms
  emailSettingsForm!: FormGroup;
  pushSettingsForm!: FormGroup;
  newRuleForm!: FormGroup;

  // Data
  alertRules: AlertRule[] = [
    {
      id: 'rule_1',
      name: 'Cảnh báo vượt ngân sách ăn uống',
      type: 'budget',
      category: 'Ăn uống',
      threshold: 80,
      frequency: 'Hàng ngày',
      isActive: true,
      conditions: { category: 'Ăn uống', threshold: 80 },
      actions: ['email', 'push'],
      createdDate: new Date('2025-08-01'),
      lastTriggered: new Date('2025-08-10'),
    },
    {
      id: 'rule_2',
      name: 'Nhắc trả tiền điện',
      type: 'recurring',
      frequency: 'Hàng tháng',
      isActive: true,
      conditions: { name: 'Tiền điện', dayOfMonth: 15 },
      actions: ['email', 'push', 'sms'],
      createdDate: new Date('2025-07-15'),
    },
    {
      id: 'rule_3',
      name: 'Cảnh báo không hoạt động',
      type: 'inactivity',
      frequency: 'Hàng ngày',
      isActive: false,
      conditions: { days: 7 },
      actions: ['push'],
      createdDate: new Date('2025-07-20'),
    },
  ];

  budgetAlerts: BudgetAlert[] = [
    {
      category: 'Ăn uống',
      budgetAmount: 3000000,
      spentAmount: 2500000,
      percentage: 83,
      daysLeft: 15,
      status: 'warning',
    },
    {
      category: 'Giải trí',
      budgetAmount: 1500000,
      spentAmount: 1600000,
      percentage: 107,
      daysLeft: 15,
      status: 'danger',
    },
  ];

  debtReminders: DebtReminder[] = [
    {
      id: 'debt_1',
      creditor: 'Thẻ tín dụng VCB',
      amount: 2500000,
      dueDate: new Date('2025-08-20'),
      daysUntilDue: 8,
      type: 'Credit Card',
      status: 'upcoming',
    },
    {
      id: 'debt_2',
      creditor: 'Vay cá nhân',
      amount: 5000000,
      dueDate: new Date('2025-08-15'),
      daysUntilDue: 3,
      type: 'Personal Loan',
      status: 'due',
    },
  ];

  alertHistory: AlertHistory[] = [
    {
      id: 'alert_1',
      ruleName: 'Cảnh báo vượt ngân sách ăn uống',
      type: 'budget',
      severity: 'warning',
      title: 'Vượt 80% ngân sách ăn uống',
      message:
        'Bạn đã chi 2.500.000 VND cho ăn uống trong tháng này (83% ngân sách)',
      timestamp: new Date('2025-08-12 09:00'),
      isRead: false,
    },
    {
      id: 'alert_2',
      ruleName: 'Nhắc trả tiền điện',
      type: 'recurring',
      severity: 'info',
      title: 'Nhắc nhở trả tiền điện',
      message: 'Hôm nay là ngày 15, đã đến hạn trả tiền điện',
      timestamp: new Date('2025-08-10 08:00'),
      isRead: true,
      actionTaken: 'Đã thanh toán',
    },
  ];

  // Options
  alertTypeOptions = [
    { label: 'Cảnh báo ngân sách', value: 'budget' },
    { label: 'Nhắc trả nợ', value: 'debt' },
    { label: 'Giao dịch định kỳ', value: 'recurring' },
    { label: 'Không hoạt động', value: 'inactivity' },
  ];

  frequencyOptions = [
    { label: 'Hàng ngày', value: 'daily' },
    { label: 'Hàng tuần', value: 'weekly' },
    { label: 'Hàng tháng', value: 'monthly' },
  ];

  emailFrequencyOptions = [
    { label: 'Ngay lập tức', value: 'immediate' },
    { label: 'Hàng ngày', value: 'daily' },
    { label: 'Hàng tuần', value: 'weekly' },
  ];

  priorityOptions = [
    { label: 'Thấp', value: 'low' },
    { label: 'Trung bình', value: 'medium' },
    { label: 'Cao', value: 'high' },
  ];

  soundOptions = [
    { label: 'Mặc định', value: 'default' },
    { label: 'Chuông', value: 'bell' },
    { label: 'Beep', value: 'beep' },
    { label: 'Không âm thanh', value: 'silent' },
  ];

  // UI State
  showNewRuleDialog = false;
  categorySuggestions: string[] = [];
  selectedActions = { email: false, push: false, sms: false };

  // Computed properties
  get activeAlertsCount(): number {
    return this.alertHistory.filter(
      (alert) =>
        !alert.isRead &&
        (alert.severity === 'warning' || alert.severity === 'danger'),
    ).length;
  }

  get budgetWarningsCount(): number {
    return this.budgetAlerts.filter((alert) => alert.status !== 'safe').length;
  }

  get debtRemindersCount(): number {
    return this.debtReminders.filter((debt) => debt.daysUntilDue <= 7).length;
  }

  get activeRulesCount(): number {
    return this.alertRules.filter((rule) => rule.isActive).length;
  }

  get hasInactivityAlert(): boolean {
    return this.daysSinceLastTransaction >= 7;
  }

  daysSinceLastTransaction = 5;

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    this.loadAlertData();
  }

  initializeForms() {
    this.emailSettingsForm = this.fb.group({
      emailEnabled: [true],
      notificationEmail: [
        'user@example.com',
        [Validators.required, Validators.email],
      ],
      budgetAlerts: [true],
      debtReminders: [true],
      recurringTransactions: [true],
      inactivityAlerts: [false],
      emailFrequency: ['immediate'],
    });

    this.pushSettingsForm = this.fb.group({
      pushEnabled: [true],
      startTime: [new Date('2025-01-01 08:00')],
      endTime: [new Date('2025-01-01 22:00')],
      priority: ['medium'],
      sound: ['default'],
    });

    this.newRuleForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      category: [''],
      threshold: [80],
      daysBefore: [3],
      recurringName: [''],
      dayOfMonth: [15],
      inactivityDays: [7],
      frequency: ['daily'],
    });
  }

  loadAlertData() {
    // Load alert data from API
    console.log('Loading alert data...');
  }

  // Budget Alert Methods
  getBudgetStatusText(status: string): string {
    switch (status) {
      case 'safe':
        return 'An toàn';
      case 'warning':
        return 'Cảnh báo';
      case 'danger':
        return 'Vượt mức';
      default:
        return status;
    }
  }

  getBudgetStatusSeverity(status: string): string {
    switch (status) {
      case 'safe':
        return 'success';
      case 'warning':
        return 'warning';
      case 'danger':
        return 'danger';
      default:
        return 'info';
    }
  }

  getProgressBarClass(status: string): string {
    switch (status) {
      case 'danger':
        return 'danger';
      case 'warning':
        return 'warning';
      default:
        return '';
    }
  }

  // Debt Methods
  getDebtStatusText(status: string): string {
    switch (status) {
      case 'upcoming':
        return 'Sắp đến hạn';
      case 'due':
        return 'Đến hạn';
      case 'overdue':
        return 'Quá hạn';
      default:
        return status;
    }
  }

  getDebtStatusSeverity(status: string): string {
    switch (status) {
      case 'upcoming':
        return 'warning';
      case 'due':
        return 'danger';
      case 'overdue':
        return 'danger';
      default:
        return 'info';
    }
  }

  markDebtPaid(debtId: string) {
    this.debtReminders = this.debtReminders.filter(
      (debt) => debt.id !== debtId,
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đã đánh dấu khoản nợ đã được thanh toán',
    });
  }

  snoozeDebtReminder(debtId: string) {
    const debt = this.debtReminders.find((d) => d.id === debtId);
    if (debt) {
      debt.dueDate = new Date(debt.dueDate.getTime() + 24 * 60 * 60 * 1000); // Add 1 day
      debt.daysUntilDue += 1;
      this.messageService.add({
        severity: 'info',
        summary: 'Thông báo',
        detail: 'Nhắc nhở sẽ được hiển thị lại vào ngày mai',
      });
    }
  }

  addTransaction() {
    this.messageService.add({
      severity: 'info',
      summary: 'Chuyển hướng',
      detail: 'Chuyển đến trang thêm giao dịch...',
    });
  }

  // Alert Rule Methods
  getAlertTypeText(type: string): string {
    switch (type) {
      case 'budget':
        return 'Ngân sách';
      case 'debt':
        return 'Nợ';
      case 'recurring':
        return 'Định kỳ';
      case 'inactivity':
        return 'Không hoạt động';
      default:
        return type;
    }
  }

  getAlertTypeSeverity(type: string): string {
    switch (type) {
      case 'budget':
        return 'warning';
      case 'debt':
        return 'danger';
      case 'recurring':
        return 'info';
      case 'inactivity':
        return 'secondary';
      default:
        return 'info';
    }
  }

  getActionText(action: string): string {
    switch (action) {
      case 'email':
        return 'Email';
      case 'push':
        return 'Push';
      case 'sms':
        return 'SMS';
      default:
        return action;
    }
  }

  toggleRule(rule: AlertRule) {
    this.messageService.add({
      severity: rule.isActive ? 'success' : 'info',
      summary: rule.isActive ? 'Đã bật' : 'Đã tắt',
      detail: `Quy tắc "${rule.name}" ${rule.isActive ? 'đã được kích hoạt' : 'đã được tắt'}`,
    });
  }

  editRule(rule: AlertRule) {
    // Implementation for editing rule
    console.log('Edit rule:', rule);
  }

  deleteRule(ruleId: string) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa quy tắc này?',
      accept: () => {
        this.alertRules = this.alertRules.filter((rule) => rule.id !== ruleId);
        this.messageService.add({
          severity: 'success',
          summary: 'Đã xóa',
          detail: 'Quy tắc cảnh báo đã được xóa',
        });
      },
    });
  }

  // New Rule Methods
  onAlertTypeChange(event: any) {
    const type = event.value;
    this.newRuleForm.patchValue({
      category: '',
      threshold: 80,
      daysBefore: 3,
      recurringName: '',
      dayOfMonth: 15,
      inactivityDays: 7,
    });
  }

  searchCategories(event: any) {
    const query = event.query.toLowerCase();
    const allCategories = [
      'Ăn uống',
      'Giải trí',
      'Giao thông',
      'Y tế',
      'Mua sắm',
      'Khác',
    ];
    this.categorySuggestions = allCategories.filter((category) =>
      category.toLowerCase().includes(query),
    );
  }

  saveNewRule() {
    if (this.newRuleForm.valid) {
      const formValue = this.newRuleForm.value;
      const actions = [];
      if (this.selectedActions.email) actions.push('email');
      if (this.selectedActions.push) actions.push('push');
      if (this.selectedActions.sms) actions.push('sms');

      let conditions: any = {};
      switch (formValue.type) {
        case 'budget':
          conditions = {
            category: formValue.category,
            threshold: formValue.threshold,
          };
          break;
        case 'debt':
          conditions = { daysBefore: formValue.daysBefore };
          break;
        case 'recurring':
          conditions = {
            name: formValue.recurringName,
            dayOfMonth: formValue.dayOfMonth,
          };
          break;
        case 'inactivity':
          conditions = { days: formValue.inactivityDays };
          break;
      }

      const newRule: AlertRule = {
        id: 'rule_' + Date.now(),
        name: formValue.name,
        type: formValue.type,
        category: formValue.category,
        threshold: formValue.threshold,
        frequency: formValue.frequency,
        isActive: true,
        conditions,
        actions,
        createdDate: new Date(),
      };

      this.alertRules.push(newRule);
      this.showNewRuleDialog = false;
      this.newRuleForm.reset();
      this.selectedActions = { email: false, push: false, sms: false };

      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Quy tắc cảnh báo mới đã được tạo',
      });
    }
  }

  // Alert History Methods
  markAsRead(alertId: string) {
    const alert = this.alertHistory.find((a) => a.id === alertId);
    if (alert) {
      alert.isRead = true;
    }
  }

  markAllAsRead() {
    this.alertHistory.forEach((alert) => (alert.isRead = true));
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đã đánh dấu tất cả cảnh báo đã đọc',
    });
  }

  deleteAlert(alertId: string) {
    this.alertHistory = this.alertHistory.filter(
      (alert) => alert.id !== alertId,
    );
    this.messageService.add({
      severity: 'success',
      summary: 'Đã xóa',
      detail: 'Cảnh báo đã được xóa',
    });
  }

  clearHistory() {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn xóa tất cả lịch sử cảnh báo?',
      accept: () => {
        this.alertHistory = [];
        this.messageService.add({
          severity: 'success',
          summary: 'Đã xóa',
          detail: 'Lịch sử cảnh báo đã được xóa',
        });
      },
    });
  }

  // Settings Methods
  saveEmailSettings() {
    if (this.emailSettingsForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Cài đặt email đã được lưu',
      });
    }
  }

  savePushSettings() {
    if (this.pushSettingsForm.valid) {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Cài đặt thông báo đẩy đã được lưu',
      });
    }
  }

  // Test Notification Methods
  testEmail() {
    this.messageService.add({
      severity: 'info',
      summary: 'Đang gửi',
      detail: 'Email thử nghiệm đang được gửi...',
    });

    setTimeout(() => {
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Email thử nghiệm đã được gửi thành công',
      });
    }, 2000);
  }

  testPushNotification() {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Cảnh báo tài chính', {
        body: 'Đây là thông báo thử nghiệm từ hệ thống cảnh báo tài chính',
        icon: '/assets/icons/notification-icon.png',
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Thông báo đẩy đã được gửi',
      });
    } else if (
      'Notification' in window &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          this.testPushNotification();
        } else {
          this.messageService.add({
            severity: 'warn',
            summary: 'Cảnh báo',
            detail: 'Bạn cần cho phép thông báo để sử dụng tính năng này',
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Lỗi',
        detail: 'Trình duyệt không hỗ trợ thông báo đẩy',
      });
    }
  }

  testAllNotifications() {
    this.testEmail();
    setTimeout(() => {
      this.testPushNotification();
    }, 1000);

    this.messageService.add({
      severity: 'info',
      summary: 'Đang kiểm tra',
      detail: 'Đang gửi tất cả loại thông báo thử nghiệm...',
    });
  }
}
