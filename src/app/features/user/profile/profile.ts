import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

// PrimeNG Imports
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ProgressBarModule } from 'primeng/progressbar';
import { ChipModule } from 'primeng/chip';
import { DividerModule } from 'primeng/divider';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { TabsModule } from 'primeng/tabs';
import { DatePickerModule } from 'primeng/datepicker';

import { ConfirmationService, MessageService } from 'primeng/api';

interface UserProfiles {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  avatar: string;
  joinDate: Date;
  plan: string;
  is2FAEnabled: boolean;
}

interface LoginSession {
  id: string;
  device: string;
  location: string;
  ip: string;
  lastAccess: Date;
  isActive: boolean;
}

interface SecurityLog {
  id: string;
  action: string;
  timestamp: Date;
  ip: string;
  device: string;
  status: 'success' | 'failed' | 'warning';
}

@Component({
  selector: 'app-user-account',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    AvatarModule,
    FileUploadModule,
    ToggleButtonModule,
    TableModule,
    TagModule,
    TabsModule,
    DatePickerModule,
    ToggleSwitchModule,
    TabsModule,
    AutoCompleteModule,
    ProgressBarModule,
    ChipModule,
    DividerModule,
  ],

  providers: [ConfirmationService, MessageService],
  template: `
    <div
      class="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6"
    >
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="mb-2 text-3xl font-bold text-white">
          👤 Tài khoản người dùng
        </h1>
        <p class="text-slate-300">
          Quản lý thông tin cá nhân và bảo mật tài khoản
        </p>
      </div>

      <!-- User Profile Card -->
      <div class="mb-8">
        <p-card
          class="border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-purple-600/20"
        >
          <div class="flex flex-col items-center gap-6 md:flex-row">
            <div class="relative">
              <p-avatar
                [image]="userProfile.avatar"
                size="xlarge"
                shape="circle"
                class="border-4 border-blue-400/50"
              >
              </p-avatar>
              <button
                class="absolute -bottom-2 -right-2 rounded-full bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                (click)="showAvatarDialog = true"
              >
                <i class="pi pi-camera text-sm"></i>
              </button>
            </div>

            <div class="flex-1 text-center md:text-left">
              <h2 class="mb-2 text-2xl font-bold text-white">
                {{ userProfile.fullName }}
              </h2>
              <p class="mb-1 text-blue-300">{{ userProfile.email }}</p>
              <div class="flex flex-wrap justify-center gap-2 md:justify-start">
                <p-chip
                  [label]="userProfile.plan"
                  [style]="{
                    background: getPlanColor(userProfile.plan),
                    color: 'white',
                  }"
                  icon="pi pi-star"
                >
                </p-chip>
                <p-chip
                  label="2FA Enabled"
                  *ngIf="userProfile.is2FAEnabled"
                  styleClass="bg-emerald-500 text-white"
                  icon="pi pi-shield"
                >
                </p-chip>
              </div>
            </div>

            <div class="flex gap-2">
              <p-button
                label="Nâng cấp Premium"
                icon="pi pi-crown"
                class="p-button-warning p-button-outlined"
                *ngIf="userProfile.plan !== 'Premium'"
                (onClick)="showUpgradeDialog = true"
              >
              </p-button>
              <p-button
                label="Đăng xuất"
                icon="pi pi-sign-out"
                class="p-button-outlined p-button-danger"
                (onClick)="logout()"
              >
              </p-button>
            </div>
          </div>
        </p-card>
      </div>

      <!-- Main Content Tabs -->
      <p-tabs class="custom-tabview">
        <p-tablist>
          <p-tab value="0">📝 Thông tin cá nhân</p-tab>
          <p-tab value="1">🔒 Bảo mật</p-tab>
          <p-tab value="2">📊 Nhật ký bảo mật</p-tab>
          <p-tab value="3">💎 Gói đăng ký</p-tab>
        </p-tablist>
        <p-tabpanels>
          <!-- Personal Information -->
          <p-tabpanel value="1" header="📝 Thông tin cá nhân">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <p-card class="border border-slate-700 bg-slate-800/50">
                <ng-template pTemplate="header">
                  <div class="flex w-full items-center justify-between p-4">
                    <h3 class="text-xl font-bold text-white">
                      Thông tin cơ bản
                    </h3>
                    <p-button
                      icon="pi pi-pencil"
                      class="p-button-text p-button-sm"
                      (onClick)="editMode = !editMode"
                    >
                    </p-button>
                  </div>
                </ng-template>

                <form [formGroup]="profileForm" (ngSubmit)="updateProfile()">
                  <div class="space-y-4">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-white"
                        >Họ và tên</label
                      >
                      <input
                        pInputText
                        formControlName="fullName"
                        [readonly]="!editMode"
                        class="w-full border-slate-600 bg-slate-700/50 text-white"
                      />
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-white"
                        >Email</label
                      >
                      <input
                        pInputText
                        formControlName="email"
                        [readonly]="!editMode"
                        class="w-full border-slate-600 bg-slate-700/50 text-white"
                      />
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-white"
                        >Số điện thoại</label
                      >
                      <input
                        pInputText
                        formControlName="phone"
                        [readonly]="!editMode"
                        class="w-full border-slate-600 bg-slate-700/50 text-white"
                      />
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-white"
                        >Ngày sinh</label
                      >
                      <!-- [readonly]="!editMode" -->
                      <p-datepicker
                        formControlName="dateOfBirth"
                        dateFormat="dd/mm/yy"
                        class="w-full"
                      >
                      </p-datepicker>
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-white"
                        >Giới tính</label
                      >
                      <p-autocomplete
                        [suggestions]="genderOptions"
                        formControlName="gender"
                        [disabled]="!editMode"
                        placeholder="Chọn giới tính"
                        class="w-full"
                      >
                      </p-autocomplete>
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-white"
                        >Địa chỉ</label
                      >
                      <input
                        pInputText
                        formControlName="address"
                        [readonly]="!editMode"
                        class="w-full border-slate-600 bg-slate-700/50 text-white"
                      />
                    </div>
                  </div>

                  <div class="mt-6 flex gap-2" *ngIf="editMode">
                    <p-button
                      label="Lưu thay đổi"
                      icon="pi pi-check"
                      type="submit"
                      class="p-button-success"
                    >
                    </p-button>
                    <p-button
                      label="Hủy"
                      icon="pi pi-times"
                      class="p-button-outlined"
                      (onClick)="cancelEdit()"
                    >
                    </p-button>
                  </div>
                </form>
              </p-card>

              <!-- Account Statistics -->
              <p-card class="border border-slate-700 bg-slate-800/50">
                <ng-template pTemplate="header">
                  <div class="p-4">
                    <h3 class="text-xl font-bold text-white">
                      Thống kê tài khoản
                    </h3>
                  </div>
                </ng-template>

                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-slate-300">Ngày tham gia</p>
                      <p class="font-semibold text-white">
                        {{ userProfile.joinDate | date: 'dd/MM/yyyy' }}
                      </p>
                    </div>
                    <div class="rounded-full bg-blue-500/20 p-3">
                      <i class="pi pi-calendar text-xl text-blue-400"></i>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-slate-300">Số giao dịch</p>
                      <p class="font-semibold text-white">
                        {{ totalTransactions }}
                      </p>
                    </div>
                    <div class="rounded-full bg-emerald-500/20 p-3">
                      <i class="pi pi-chart-bar text-xl text-emerald-400"></i>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-slate-300">Tổng tiết kiệm</p>
                      <p class="font-semibold text-white">
                        {{ totalSavings | number: '1.0-0' }} VND
                      </p>
                    </div>
                    <div class="rounded-full bg-purple-500/20 p-3">
                      <i class="pi pi-wallet text-xl text-purple-400"></i>
                    </div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div>
                      <p class="text-sm text-slate-300">
                        Mức độ hoàn thành hồ sơ
                      </p>
                      <p class="font-semibold text-white">
                        {{ profileCompleteness }}%
                      </p>
                    </div>
                    <div class="rounded-full bg-yellow-500/20 p-3">
                      <i class="pi pi-user text-xl text-yellow-400"></i>
                    </div>
                  </div>

                  <p-progressBar
                    [value]="profileCompleteness"
                    [showValue]="false"
                    styleClass="h-2"
                  >
                  </p-progressBar>
                </div>
              </p-card>
            </div>
          </p-tabpanel>

          <!-- Security Settings -->
          <p-tabpanel value="2" header="🔒 Bảo mật">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <!-- Password Change -->
              <p-card class="border border-slate-700 bg-slate-800/50">
                <ng-template pTemplate="header">
                  <div class="p-4">
                    <h3 class="text-xl font-bold text-white">Đổi mật khẩu</h3>
                  </div>
                </ng-template>

                <form [formGroup]="passwordForm" (ngSubmit)="changePassword()">
                  <div class="space-y-4">
                    <div>
                      <label class="mb-2 block text-sm font-medium text-white"
                        >Mật khẩu hiện tại</label
                      >
                      <p-password
                        formControlName="currentPassword"
                        [toggleMask]="true"
                        placeholder="Nhập mật khẩu hiện tại"
                        styleClass="w-full"
                      >
                      </p-password>
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-white"
                        >Mật khẩu mới</label
                      >
                      <p-password
                        formControlName="newPassword"
                        [toggleMask]="true"
                        placeholder="Nhập mật khẩu mới"
                        [feedback]="true"
                        styleClass="w-full"
                      >
                      </p-password>
                    </div>

                    <div>
                      <label class="mb-2 block text-sm font-medium text-white"
                        >Xác nhận mật khẩu mới</label
                      >
                      <p-password
                        formControlName="confirmPassword"
                        [toggleMask]="true"
                        placeholder="Xác nhận mật khẩu mới"
                        [feedback]="false"
                        styleClass="w-full"
                      >
                      </p-password>
                    </div>
                  </div>

                  <p-button
                    label="Đổi mật khẩu"
                    icon="pi pi-key"
                    type="submit"
                    [disabled]="passwordForm.invalid"
                    class="mt-6 w-full"
                  >
                  </p-button>
                </form>
              </p-card>

              <!-- 2FA Settings -->
              <p-card class="border border-slate-700 bg-slate-800/50">
                <ng-template pTemplate="header">
                  <div class="p-4">
                    <h3 class="text-xl font-bold text-white">
                      Xác thực 2 bước (2FA)
                    </h3>
                  </div>
                </ng-template>

                <div class="space-y-6">
                  <div class="flex items-center justify-between">
                    <div>
                      <h4 class="font-semibold text-white">Trạng thái 2FA</h4>
                      <p class="text-sm text-slate-300">
                        {{
                          userProfile.is2FAEnabled ? 'Đã bật' : 'Chưa bật'
                        }}
                        xác thực 2 bước
                      </p>
                    </div>
                    [(ngModel)]="userProfile.is2FAEnabled"
                    (onChange)="toggle2FA()"
                    <p-toggleswitch> </p-toggleswitch>
                  </div>

                  <p-divider></p-divider>

                  <div
                    *ngIf="!userProfile.is2FAEnabled"
                    class="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4"
                  >
                    <div class="flex items-center gap-3">
                      <i
                        class="pi pi-exclamation-triangle text-xl text-yellow-400"
                      ></i>
                      <div>
                        <h4 class="font-semibold text-yellow-400">
                          Bảo mật chưa đầy đủ
                        </h4>
                        <p class="text-sm text-slate-300">
                          Hãy bật 2FA để tăng cường bảo mật cho tài khoản
                        </p>
                      </div>
                    </div>
                  </div>

                  <div *ngIf="userProfile.is2FAEnabled" class="space-y-4">
                    <div
                      class="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4"
                    >
                      <div class="flex items-center gap-3">
                        <i class="pi pi-shield text-xl text-emerald-400"></i>
                        <div>
                          <h4 class="font-semibold text-emerald-400">
                            Bảo mật cao
                          </h4>
                          <p class="text-sm text-slate-300">
                            Tài khoản đã được bảo vệ bởi xác thực 2 bước
                          </p>
                        </div>
                      </div>
                    </div>

                    <div class="space-y-2">
                      <p class="font-medium text-white">Mã dự phòng</p>
                      <div class="grid grid-cols-2 gap-2">
                        <span
                          *ngFor="let code of backupCodes"
                          class="rounded bg-slate-700 p-2 text-center font-mono text-sm text-slate-300"
                        >
                          {{ code }}
                        </span>
                      </div>
                      <p class="text-xs text-slate-400">
                        Lưu trữ các mã này ở nơi an toàn để khôi phục tài khoản
                      </p>
                    </div>
                  </div>

                  <p-button
                    [label]="
                      userProfile.is2FAEnabled
                        ? 'Tạo lại mã dự phòng'
                        : 'Thiết lập 2FA'
                    "
                    icon="pi pi-cog"
                    class="w-full"
                    (onClick)="setup2FA()"
                  >
                  </p-button>
                </div>
              </p-card>
            </div>

            <!-- Login Sessions -->
            <div class="mt-6">
              <p-card class="border border-slate-700 bg-slate-800/50">
                <ng-template pTemplate="header">
                  <div class="flex w-full items-center justify-between p-4">
                    <h3 class="text-xl font-bold text-white">
                      Phiên đăng nhập
                    </h3>
                    <p-button
                      label="Đăng xuất tất cả"
                      icon="pi pi-sign-out"
                      class="p-button-outlined p-button-danger p-button-sm"
                      (onClick)="logoutAllSessions()"
                    >
                    </p-button>
                  </div>
                </ng-template>

                <p-table [value]="loginSessions" styleClass="p-datatable-dark">
                  <ng-template pTemplate="header">
                    <tr>
                      <th class="text-white">Thiết bị</th>
                      <th class="text-white">Vị trí</th>
                      <th class="text-white">IP Address</th>
                      <th class="text-white">Lần truy cập cuối</th>
                      <th class="text-white">Trạng thái</th>
                      <th class="text-white">Hành động</th>
                    </tr>
                  </ng-template>
                  <ng-template pTemplate="body" let-session>
                    <tr>
                      <td class="text-white">{{ session.device }}</td>
                      <td class="text-slate-300">{{ session.location }}</td>
                      <td class="font-mono text-slate-300">{{ session.ip }}</td>
                      <td class="text-slate-300">
                        {{ session.lastAccess | date: 'dd/MM/yyyy HH:mm' }}
                      </td>
                      <td>
                        <p-tag
                          [value]="
                            session.isActive
                              ? 'Đang hoạt động'
                              : 'Không hoạt động'
                          "
                          [severity]="
                            session.isActive ? 'success' : 'secondary'
                          "
                        >
                        </p-tag>
                      </td>
                      <td>
                        <p-button
                          icon="pi pi-times"
                          class="p-button-rounded p-button-text p-button-danger p-button-sm"
                          *ngIf="session.isActive"
                          (onClick)="terminateSession(session.id)"
                          pTooltip="Kết thúc phiên"
                        >
                        </p-button>
                      </td>
                    </tr>
                  </ng-template>
                </p-table>
              </p-card>
            </div>
          </p-tabpanel>

          <!-- Security Logs -->
          <p-tabpanel value="3" header="📊 Nhật ký bảo mật">
            <p-card class="border border-slate-700 bg-slate-800/50">
              <p-table
                [value]="securityLogs"
                [paginator]="true"
                [rows]="10"
                styleClass="p-datatable-dark"
              >
                <ng-template pTemplate="header">
                  <tr>
                    <th class="text-white">Hành động</th>
                    <th class="text-white">Thời gian</th>
                    <th class="text-white">IP Address</th>
                    <th class="text-white">Thiết bị</th>
                    <th class="text-white">Trạng thái</th>
                  </tr>
                </ng-template>
                <ng-template pTemplate="body" let-log>
                  <tr>
                    <td class="text-white">{{ log.action }}</td>
                    <td class="text-slate-300">
                      {{ log.timestamp | date: 'dd/MM/yyyy HH:mm:ss' }}
                    </td>
                    <td class="font-mono text-slate-300">{{ log.ip }}</td>
                    <td class="text-slate-300">{{ log.device }}</td>
                    <td>
                      <p-tag
                        [value]="getStatusLabel(log.status)"
                        [severity]="getStatusSeverity(log.status)"
                      >
                      </p-tag>
                    </td>
                  </tr>
                </ng-template>
              </p-table>
            </p-card>
          </p-tabpanel>

          <!-- Subscription Management -->
          <p-tabpanel value="4" header="💎 Gói đăng ký">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <!-- Current Plan -->
              <p-card
                class="border border-blue-500/30 bg-gradient-to-r from-blue-500/20 to-blue-600/20"
              >
                <ng-template pTemplate="header">
                  <div class="p-4 text-center">
                    <i class="pi pi-user mb-2 text-3xl text-blue-400"></i>
                    <h3 class="text-xl font-bold text-white">Gói hiện tại</h3>
                  </div>
                </ng-template>

                <div class="text-center">
                  <h2 class="mb-2 text-3xl font-bold text-white">
                    {{ userProfile.plan }}
                  </h2>
                  <p class="mb-4 text-blue-300">
                    {{ getCurrentPlanPrice() }}/tháng
                  </p>

                  <div class="space-y-3 text-left">
                    <div class="flex items-center text-slate-300">
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>Quản lý giao dịch cơ bản</span>
                    </div>
                    <div class="flex items-center text-slate-300">
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>Báo cáo tài chính</span>
                    </div>
                    <div
                      class="flex items-center text-slate-300"
                      *ngIf="userProfile.plan !== 'Free'"
                    >
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>Xuất báo cáo PDF/Excel</span>
                    </div>
                  </div>

                  <p-button
                    [label]="
                      userProfile.plan === 'Free' ? 'Nâng cấp' : 'Quản lý gói'
                    "
                    icon="pi pi-crown"
                    class="mt-6 w-full"
                    [class]="
                      userProfile.plan === 'Free'
                        ? 'p-button-warning'
                        : 'p-button-outlined'
                    "
                    (onClick)="showUpgradeDialog = true"
                  >
                  </p-button>
                </div>
              </p-card>

              <!-- Premium Plan -->
              <p-card
                class="relative border border-yellow-500/30 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20"
              >
                <div
                  class="absolute -top-3 left-1/2 -translate-x-1/2 transform"
                >
                  <span
                    class="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black"
                    >PHỔ BIẾN</span
                  >
                </div>

                <ng-template pTemplate="header">
                  <div class="p-4 text-center">
                    <i class="pi pi-crown mb-2 text-3xl text-yellow-400"></i>
                    <h3 class="text-xl font-bold text-white">Premium</h3>
                  </div>
                </ng-template>

                <div class="text-center">
                  <h2 class="mb-2 text-3xl font-bold text-white">99.000 VND</h2>
                  <p class="mb-4 text-yellow-300">/tháng</p>

                  <div class="space-y-3 text-left">
                    <div class="flex items-center text-slate-300">
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>Tất cả tính năng Free</span>
                    </div>
                    <div class="flex items-center text-slate-300">
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>Phân tích nâng cao</span>
                    </div>
                    <div class="flex items-center text-slate-300">
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>Xuất báo cáo không giới hạn</span>
                    </div>
                    <div class="flex items-center text-slate-300">
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>Hỗ trợ ưu tiên</span>
                    </div>
                  </div>

                  <p-button
                    [label]="
                      userProfile.plan === 'Premium'
                        ? 'Đang sử dụng'
                        : 'Nâng cấp'
                    "
                    icon="pi pi-crown"
                    class="mt-6 w-full"
                    [disabled]="userProfile.plan === 'Premium'"
                    [class]="
                      userProfile.plan === 'Premium'
                        ? 'p-button-outlined'
                        : 'p-button-warning'
                    "
                    (onClick)="upgradeToPremium()"
                  >
                  </p-button>
                </div>
              </p-card>

              <!-- Pro Plan -->
              <p-card
                class="border border-purple-500/30 bg-gradient-to-r from-purple-500/20 to-purple-600/20"
              >
                <ng-template pTemplate="header">
                  <div class="p-4 text-center">
                    <i class="pi pi-star mb-2 text-3xl text-purple-400"></i>
                    <h3 class="text-xl font-bold text-white">Pro</h3>
                  </div>
                </ng-template>

                <div class="text-center">
                  <h2 class="mb-2 text-3xl font-bold text-white">
                    199.000 VND
                  </h2>
                  <p class="mb-4 text-purple-300">/tháng</p>

                  <div class="space-y-3 text-left">
                    <div class="flex items-center text-slate-300">
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>Tất cả tính năng Premium</span>
                    </div>
                    <div class="flex items-center text-slate-300">
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>API Access</span>
                    </div>
                    <div class="flex items-center text-slate-300">
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>Tích hợp ngân hàng</span>
                    </div>
                    <div class="flex items-center text-slate-300">
                      <i class="pi pi-check mr-3 text-emerald-400"></i>
                      <span>Hỗ trợ 24/7</span>
                    </div>
                  </div>

                  <p-button
                    [label]="
                      userProfile.plan === 'Pro' ? 'Đang sử dụng' : 'Nâng cấp'
                    "
                    icon="pi pi-star"
                    class="mt-6 w-full"
                    [disabled]="userProfile.plan === 'Pro'"
                    [class]="
                      userProfile.plan === 'Pro'
                        ? 'p-button-outlined'
                        : 'p-button-help'
                    "
                    (onClick)="upgradeToPro()"
                  >
                  </p-button>
                </div>
              </p-card>
            </div>

            <!-- Billing History -->
            <div class="mt-6">
              <p-card class="border border-slate-700 bg-slate-800/50">
                <ng-template pTemplate="header">
                  <div class="p-4">
                    <h3 class="text-xl font-bold text-white">
                      Lịch sử thanh toán
                    </h3>
                  </div>
                </ng-template>

                <p-table
                  [value]="billingHistory"
                  [paginator]="true"
                  [rows]="5"
                  styleClass="p-datatable-dark"
                >
                  <ng-template pTemplate="header">
                    <tr>
                      <th class="text-white">Ngày</th>
                      <th class="text-white">Gói</th>
                      <th class="text-white">Số tiền</th>
                      <th class="text-white">Phương thức</th>
                      <th class="text-white">Trạng thái</th>
                      <th class="text-white">Hóa đơn</th>
                    </tr>
                  </ng-template>
                  <ng-template pTemplate="body" let-bill>
                    <tr>
                      <td class="text-white">
                        {{ bill.date | date: 'dd/MM/yyyy' }}
                      </td>
                      <td class="text-slate-300">{{ bill.plan }}</td>
                      <td class="text-white">
                        {{ bill.amount | number: '1.0-0' }} VND
                      </td>
                      <td class="text-slate-300">{{ bill.method }}</td>
                      <td>
                        <p-tag
                          [value]="bill.status"
                          [severity]="getBillingSeverity(bill.status)"
                        >
                        </p-tag>
                      </td>
                      <td>
                        <p-button
                          icon="pi pi-download"
                          class="p-button-rounded p-button-text p-button-sm"
                          (onClick)="downloadInvoice(bill.id)"
                          pTooltip="Tải hóa đơn"
                        >
                        </p-button>
                      </td>
                    </tr>
                  </ng-template>
                </p-table>
              </p-card>
            </div>
          </p-tabpanel>
        </p-tabpanels>
      </p-tabs>

      <!-- Avatar Upload Dialog -->
      <p-dialog
        [(visible)]="showAvatarDialog"
        header="Cập nhật ảnh đại diện"
        [modal]="true"
        [style]="{ width: '400px' }"
        styleClass="custom-dialog"
      >
        <div class="text-center">
          <p-fileUpload
            mode="basic"
            name="avatar"
            accept="image/*"
            [maxFileSize]="1000000"
            (onSelect)="onAvatarSelect($event)"
            chooseLabel="Chọn ảnh"
            class="mb-4"
          >
          </p-fileUpload>
          <p class="text-sm text-slate-400">
            Kích thước tối đa: 1MB. Định dạng: JPG, PNG
          </p>
        </div>
      </p-dialog>

      <!-- Upgrade Plan Dialog -->
      <p-dialog
        [(visible)]="showUpgradeDialog"
        header="Nâng cấp gói dịch vụ"
        [modal]="true"
        [style]="{ width: '600px' }"
        styleClass="custom-dialog"
      >
        <div class="space-y-4">
          <p class="text-slate-300">
            Chọn phương thức thanh toán để nâng cấp gói dịch vụ:
          </p>

          <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div
              class="cursor-pointer rounded-lg border border-slate-600 p-4 transition-colors hover:border-blue-400"
              [class.border-blue-400]="selectedPaymentMethod === 'momo'"
              (click)="selectedPaymentMethod = 'momo'"
            >
              <div class="flex items-center">
                <div class="mr-3 rounded-lg bg-pink-500 p-2">
                  <i class="pi pi-mobile text-white"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-white">Ví MoMo</h4>
                  <p class="text-sm text-slate-400">
                    Thanh toán qua ví điện tử
                  </p>
                </div>
              </div>
            </div>

            <div
              class="cursor-pointer rounded-lg border border-slate-600 p-4 transition-colors hover:border-blue-400"
              [class.border-blue-400]="selectedPaymentMethod === 'banking'"
              (click)="selectedPaymentMethod = 'banking'"
            >
              <div class="flex items-center">
                <div class="mr-3 rounded-lg bg-blue-500 p-2">
                  <i class="pi pi-credit-card text-white"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-white">Internet Banking</h4>
                  <p class="text-sm text-slate-400">Chuyển khoản ngân hàng</p>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-lg bg-slate-700/50 p-4">
            <h4 class="mb-2 font-semibold text-white">Tóm tắt thanh toán</h4>
            <div class="mb-1 flex justify-between text-slate-300">
              <span>Gói Premium (1 tháng)</span>
              <span>99.000 VND</span>
            </div>
            <div class="mb-1 flex justify-between text-slate-300">
              <span>VAT (10%)</span>
              <span>9.900 VND</span>
            </div>
            <div class="mt-2 border-t border-slate-600 pt-2">
              <div class="flex justify-between font-semibold text-white">
                <span>Tổng cộng</span>
                <span>108.900 VND</span>
              </div>
            </div>
          </div>
        </div>

        <ng-template pTemplate="footer">
          <p-button
            label="Hủy"
            icon="pi pi-times"
            class="p-button-text"
            (onClick)="showUpgradeDialog = false"
          >
          </p-button>
          <p-button
            label="Thanh toán"
            icon="pi pi-check"
            class="p-button-warning"
            [disabled]="!selectedPaymentMethod"
            (onClick)="processPayment()"
          >
          </p-button>
        </ng-template>
      </p-dialog>

      <!-- 2FA Setup Dialog -->
      <p-dialog
        [(visible)]="show2FADialog"
        header="Thiết lập xác thực 2 bước"
        [modal]="true"
        [style]="{ width: '500px' }"
        styleClass="custom-dialog"
      >
        <div class="space-y-4 text-center">
          <div class="inline-block rounded-lg bg-slate-700 p-4">
            <!-- QR Code placeholder -->
            <div
              class="flex h-48 w-48 items-center justify-center rounded-lg bg-white"
            >
              <span class="text-black">QR CODE</span>
            </div>
          </div>

          <div>
            <p class="mb-2 text-slate-300">
              Quét mã QR bằng ứng dụng Google Authenticator hoặc nhập mã thủ
              công:
            </p>
            <code class="rounded bg-slate-700 px-3 py-1 text-white"
              >JBSWY3DPEHPK3PXP</code
            >
          </div>

          <div>
            <label class="mb-2 block text-sm font-medium text-white"
              >Nhập mã xác thực 6 chữ số</label
            >
            <!-- [(ngModel)]="twoFACode" -->
            <input
              pInputText
              placeholder="000000"
              class="w-full text-center text-2xl tracking-widest"
              maxlength="6"
            />
          </div>
        </div>

        <ng-template pTemplate="footer">
          <p-button
            label="Hủy"
            icon="pi pi-times"
            class="p-button-text"
            (onClick)="show2FADialog = false"
          >
          </p-button>
          <p-button
            label="Xác nhận"
            icon="pi pi-check"
            class="p-button-success"
            [disabled]="!twoFACode || twoFACode.length !== 6"
            (onClick)="confirm2FA()"
          >
          </p-button>
        </ng-template>
      </p-dialog>

      <p-toast></p-toast>
      <p-confirmDialog styleClass="custom-dialog"></p-confirmDialog>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep {
        .p-card {
          background: transparent;
          border-radius: 12px;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .p-card .p-card-body {
          padding: 1.5rem;
        }

        .p-inputtext {
          background: rgba(51, 65, 85, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: white;
        }

        .p-inputtext:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.2);
        }

        .p-password input {
          background: rgba(51, 65, 85, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: white;
        }

        .p-dropdown {
          background: rgba(51, 65, 85, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: white;
        }

        .p-calendar input {
          background: rgba(51, 65, 85, 0.8);
          border: 1px solid rgba(148, 163, 184, 0.3);
          color: white;
        }

        .p-button {
          border-radius: 8px;
        }

        .p-datatable .p-datatable-header {
          background: rgba(51, 65, 85, 0.5);
          border-color: rgba(148, 163, 184, 0.3);
        }

        .p-datatable .p-datatable-tbody > tr {
          background: transparent;
          border-color: rgba(148, 163, 184, 0.1);
        }

        .p-datatable .p-datatable-tbody > tr:nth-child(even) {
          background: rgba(51, 65, 85, 0.2);
        }

        .p-progressbar {
          background: rgba(51, 65, 85, 0.5);
          border-radius: 4px;
        }

        .p-progressbar .p-progressbar-value {
          background: linear-gradient(90deg, #3b82f6, #06b6d4);
        }

        .custom-tabview .p-tabview-nav {
          background: rgba(51, 65, 85, 0.5);
          border-color: rgba(148, 163, 184, 0.3);
        }

        .custom-tabview .p-tabview-nav li .p-tabview-nav-link {
          color: rgb(203, 213, 225);
          border-color: transparent;
        }

        .custom-tabview .p-tabview-nav li.p-highlight .p-tabview-nav-link {
          color: white;
          border-color: #3b82f6;
        }

        .custom-tabview .p-tabview-panels {
          background: transparent;
          border-color: rgba(148, 163, 184, 0.3);
        }

        .custom-dialog .p-dialog {
          background: rgba(30, 41, 59, 0.95);
          border: 1px solid rgba(148, 163, 184, 0.3);
        }

        .custom-dialog .p-dialog-header {
          background: rgba(51, 65, 85, 0.5);
          border-color: rgba(148, 163, 184, 0.3);
          color: white;
        }

        .custom-dialog .p-dialog-content {
          background: transparent;
          color: white;
        }

        .p-fileupload-choose {
          background: #3b82f6;
          border-color: #3b82f6;
        }
      }
    `,
  ],
})
export class Profile implements OnInit {
  // Form Groups
  profileForm!: FormGroup;
  passwordForm!: FormGroup;

  // User Data
  userProfile: UserProfiles = {
    id: 'user_001',
    fullName: 'Nguyễn Văn An',
    email: 'nguyen.van.an@example.com',
    phone: '0987654321',
    dateOfBirth: new Date('1990-05-15'),
    gender: 'male',
    address: 'Quận 1, TP. Hồ Chí Minh',
    avatar: 'https://via.placeholder.com/150',
    joinDate: new Date('2023-01-15'),
    plan: 'Free',
    is2FAEnabled: false,
  };

  // Options
  genderOptions = [
    { label: 'Nam', value: 'male' },
    { label: 'Nữ', value: 'female' },
    { label: 'Khác', value: 'other' },
  ];

  // Statistics
  totalTransactions = 234;
  totalSavings = 15000000;
  profileCompleteness = 85;

  // Security Data
  loginSessions: LoginSession[] = [
    {
      id: 'session_1',
      device: 'Chrome on Windows',
      location: 'Ho Chi Minh City, VN',
      ip: '192.168.1.100',
      lastAccess: new Date(),
      isActive: true,
    },
    {
      id: 'session_2',
      device: 'Safari on iPhone',
      location: 'Ho Chi Minh City, VN',
      ip: '192.168.1.101',
      lastAccess: new Date(Date.now() - 86400000),
      isActive: false,
    },
  ];

  securityLogs: SecurityLog[] = [
    {
      id: 'log_1',
      action: 'Đăng nhập thành công',
      timestamp: new Date(),
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success',
    },
    {
      id: 'log_2',
      action: 'Thay đổi mật khẩu',
      timestamp: new Date(Date.now() - 3600000),
      ip: '192.168.1.100',
      device: 'Chrome on Windows',
      status: 'success',
    },
    {
      id: 'log_3',
      action: 'Đăng nhập thất bại',
      timestamp: new Date(Date.now() - 7200000),
      ip: '192.168.1.102',
      device: 'Unknown',
      status: 'failed',
    },
  ];

  // Billing History
  billingHistory = [
    {
      id: 'bill_1',
      date: new Date('2025-08-01'),
      plan: 'Premium',
      amount: 108900,
      method: 'MoMo',
      status: 'Thành công',
    },
    {
      id: 'bill_2',
      date: new Date('2025-07-01'),
      plan: 'Premium',
      amount: 108900,
      method: 'Banking',
      status: 'Thành công',
    },
  ];

  // 2FA
  backupCodes = ['ABC123', 'DEF456', 'GHI789', 'JKL012', 'MNO345', 'PQR678'];
  twoFACode = '';

  // UI State
  editMode = false;
  showAvatarDialog = false;
  showUpgradeDialog = false;
  show2FADialog = false;
  selectedPaymentMethod = '';

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
  ) {
    this.initializeForms();
  }

  ngOnInit() {
    this.loadUserProfile();
  }

  initializeForms() {
    this.profileForm = this.fb.group({
      fullName: [this.userProfile.fullName, Validators.required],
      email: [this.userProfile.email, [Validators.required, Validators.email]],
      phone: [this.userProfile.phone],
      dateOfBirth: [this.userProfile.dateOfBirth],
      gender: [this.userProfile.gender],
      address: [this.userProfile.address],
    });

    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator },
    );
  }

  passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');

    if (
      newPassword &&
      confirmPassword &&
      newPassword.value !== confirmPassword.value
    ) {
      confirmPassword.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }

    return null;
  }

  loadUserProfile() {
    // Load user profile from API
    console.log('Loading user profile...');
  }

  updateProfile() {
    if (this.profileForm.valid) {
      Object.assign(this.userProfile, this.profileForm.value);
      this.editMode = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Thông tin cá nhân đã được cập nhật',
      });
    }
  }

  cancelEdit() {
    this.profileForm.patchValue({
      fullName: this.userProfile.fullName,
      email: this.userProfile.email,
      phone: this.userProfile.phone,
      dateOfBirth: this.userProfile.dateOfBirth,
      gender: this.userProfile.gender,
      address: this.userProfile.address,
    });
    this.editMode = false;
  }

  changePassword() {
    if (this.passwordForm.valid) {
      // API call to change password
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Mật khẩu đã được thay đổi',
      });
      this.passwordForm.reset();
    }
  }

  toggle2FA() {
    if (this.userProfile.is2FAEnabled) {
      this.show2FADialog = true;
    } else {
      // Disable 2FA
      this.confirmationService.confirm({
        message: 'Bạn có chắc chắn muốn tắt xác thực 2 bước?',
        accept: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Thông báo',
            detail: 'Xác thực 2 bước đã được tắt',
          });
        },
        reject: () => {
          this.userProfile.is2FAEnabled = true;
        },
      });
    }
  }

  setup2FA() {
    this.show2FADialog = true;
  }

  confirm2FA() {
    if (this.twoFACode && this.twoFACode.length === 6) {
      this.userProfile.is2FAEnabled = true;
      this.show2FADialog = false;
      this.twoFACode = '';
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Xác thực 2 bước đã được kích hoạt',
      });
    }
  }

  terminateSession(sessionId: string) {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn kết thúc phiên này?',
      accept: () => {
        this.loginSessions = this.loginSessions.filter(
          (s) => s.id !== sessionId,
        );
        this.messageService.add({
          severity: 'info',
          summary: 'Thông báo',
          detail: 'Phiên đã được kết thúc',
        });
      },
    });
  }

  logoutAllSessions() {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn đăng xuất khỏi tất cả thiết bị?',
      accept: () => {
        this.loginSessions = [];
        this.messageService.add({
          severity: 'info',
          summary: 'Thông báo',
          detail: 'Đã đăng xuất khỏi tất cả thiết bị',
        });
      },
    });
  }

  logout() {
    this.confirmationService.confirm({
      message: 'Bạn có chắc chắn muốn đăng xuất?',
      accept: () => {
        // Logout logic
        console.log('User logged out');
      },
    });
  }

  onAvatarSelect(event: any) {
    const file = event.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.userProfile.avatar = e.target.result;
        this.showAvatarDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Thành công',
          detail: 'Ảnh đại diện đã được cập nhật',
        });
      };
      reader.readAsDataURL(file);
    }
  }

  upgradeToPremium() {
    this.showUpgradeDialog = true;
  }

  upgradeToPro() {
    this.showUpgradeDialog = true;
  }

  processPayment() {
    if (this.selectedPaymentMethod) {
      this.showUpgradeDialog = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Thành công',
        detail: 'Đang chuyển hướng đến trang thanh toán...',
      });

      // Simulate upgrade
      setTimeout(() => {
        this.userProfile.plan = 'Premium';
        this.messageService.add({
          severity: 'success',
          summary: 'Chúc mừng!',
          detail: 'Tài khoản đã được nâng cấp thành công',
        });
      }, 2000);
    }
  }

  downloadInvoice(billId: string) {
    console.log('Downloading invoice:', billId);
    this.messageService.add({
      severity: 'info',
      summary: 'Thông báo',
      detail: 'Đang tải xuống hóa đơn...',
    });
  }

  // Helper Methods
  getPlanColor(plan: string): string {
    switch (plan) {
      case 'Free':
        return '#64748b';
      case 'Premium':
        return '#f59e0b';
      case 'Pro':
        return '#8b5cf6';
      default:
        return '#64748b';
    }
  }

  getCurrentPlanPrice(): string {
    switch (this.userProfile.plan) {
      case 'Free':
        return 'Miễn phí';
      case 'Premium':
        return '99.000 VND';
      case 'Pro':
        return '199.000 VND';
      default:
        return 'Miễn phí';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'success':
        return 'Thành công';
      case 'failed':
        return 'Thất bại';
      case 'warning':
        return 'Cảnh báo';
      default:
        return status;
    }
  }

  getStatusSeverity(status: string): string {
    switch (status) {
      case 'success':
        return 'success';
      case 'failed':
        return 'danger';
      case 'warning':
        return 'warning';
      default:
        return 'info';
    }
  }

  getBillingSeverity(status: string): string {
    switch (status) {
      case 'Thành công':
        return 'success';
      case 'Đang xử lý':
        return 'warning';
      case 'Thất bại':
        return 'danger';
      default:
        return 'info';
    }
  }
}
