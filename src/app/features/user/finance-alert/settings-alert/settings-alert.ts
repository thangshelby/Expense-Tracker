import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings-alert',
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    SelectButtonModule,
    ReactiveFormsModule,
    ButtonModule,
    DatePickerModule,
    SelectModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './settings-alert.html',
  styleUrl: './settings-alert.css',
})
export class SettingsAlert {
  emailSettingsForm!: FormGroup;
  pushSettingsForm!: FormGroup;
  newRuleForm!: FormGroup;

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
  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {
    this.initializeForms();
  }
  initializeForms() {
    this.emailSettingsForm = new FormGroup({
      emailEnabled: new FormControl(false, Validators.required),
      notificationEmail: new FormControl('user@example.com', [
        Validators.required,
        Validators.email,
      ]),
      budgetAlerts: new FormControl(true),
      debtReminders: new FormControl(true),
      recurringTransactions: new FormControl(true),
      inactivityAlerts: new FormControl(false),
      emailFrequency: new FormControl('immediate'),
    });

    this.pushSettingsForm = new FormGroup({
      pushEnabled: new FormControl(true),
      startTime: new FormControl(new Date()),
      endTime: new FormControl(new Date()),
      priority: new FormControl('medium'),
      sound: new FormControl('default'),
    });

    // this.newRuleForm = this.fb.group({
    //   name: ['', Validators.required],
    //   type: ['', Validators.required],
    //   category: [''],
    //   threshold: [80],
    //   daysBefore: [3],
    //   recurringName: [''],
    //   dayOfMonth: [15],
    //   inactivityDays: [7],
    //   frequency: ['daily'],
    // });
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
  checked = false;
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
