import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
  avatar?: string;
  action?: {
    label: string;
    callback: () => void;
  };
}

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    BadgeModule,
    ButtonModule,
    DividerModule,
    AvatarModule,
  ],
  template: `
    <div class="relative">
      <!-- Notification Bell Button -->
      <button
        (click)="toggleNotifications($event)"
        class="relative flex cursor-pointer items-center rounded-full border border-border p-2 hover:bg-gray-100 transition-colors duration-200"
        [class.bg-blue-50]="hasUnreadNotifications()"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2"
          [attr.stroke]="hasUnreadNotifications() ? '#3b82f6' : '#8b93a3'"
          class="size-6 scale-75"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"
          />
        </svg>
        
        <!-- Unread count badge -->
        @if (getUnreadCount() > 0) {
          <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
            {{ getUnreadCount() > 99 ? '99+' : getUnreadCount() }}
          </span>
        }
      </button>

      <!-- Notifications Overlay Panel -->
      @if (isNotificationPanelOpen) {
        <div 
          #notificationPanel
          class="absolute top-full right-0 mt-2 border border-border rounded-xl p-0 bg-background-component shadow-lg w-96 z-50"
        >
          <div class="flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b border-border">
            <div class="flex items-center gap-2">
              <h3 class="text-lg font-semibold text-headline">Thông báo</h3>
              @if (getUnreadCount() > 0) {
                <p-badge 
                  [value]="getUnreadCount().toString()" 
                  severity="danger"
                  styleClass="!bg-red-500"
                />
              }
            </div>
            @if (hasUnreadNotifications()) {
              <button
                (click)="markAllAsRead()"
                class="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                Đánh dấu đã đọc
              </button>
            }
          </div>

          <!-- Notifications List -->
          <div class="max-h-96 overflow-y-auto">
            @if (notifications.length === 0) {
              <div class="flex flex-col items-center justify-center py-8 text-center">
                <mat-icon class="text-gray-400 !text-4xl mb-2">notifications_off</mat-icon>
                <p class="text-sub-headline">Không có thông báo nào</p>
              </div>
            } @else {
              @for (notification of notifications; track notification.id) {
                <div
                  (click)="markAsRead(notification)"
                  class="flex items-start gap-3 p-4 border-b border-border last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer"
                  [class.bg-blue-50]="!notification.read"
                >
                  <!-- Avatar or Icon -->
                  <div class="flex-shrink-0">
                    @if (notification.avatar) {
                      <p-avatar 
                        [image]="notification.avatar" 
                        size="normal" 
                        shape="circle"
                      />
                    } @else {
                      <div class="w-10 h-10 rounded-full flex items-center justify-center"
                           [ngClass]="getNotificationIconClass(notification.type)">
                        <mat-icon class="!text-lg">{{ getNotificationIcon(notification.type) }}</mat-icon>
                      </div>
                    }
                  </div>

                  <!-- Content -->
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between mb-1">
                      <h4 class="text-sm font-medium text-headline truncate">
                        {{ notification.title }}
                      </h4>
                      @if (!notification.read) {
                        <div class="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                      }
                    </div>
                    
                    <p class="text-sm text-sub-headline leading-relaxed mb-2">
                      {{ notification.message }}
                    </p>
                    
                    <div class="flex items-center justify-between">
                      <span class="text-xs text-gray-500">
                        {{ getTimeAgo(notification.timestamp) }}
                      </span>
                      
                      @if (notification.action) {
                        <button
                          (click)="$event.stopPropagation(); notification.action!.callback()"
                          class="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {{ notification.action.label }}
                        </button>
                      }
                    </div>
                  </div>
                </div>
              }
            }
          </div>

          <!-- Footer -->
          @if (notifications.length > 0) {
            <div class="p-4 border-t border-border">
              <button
                (click)="clearAll()"
                class="w-full text-center text-sm text-red-600 hover:text-red-800 font-medium py-2 rounded-lg hover:bg-red-50 transition-colors"
              >
                Xóa tất cả thông báo
              </button>
            </div>
          }
        </div>
        </div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class NotificationComponent implements OnInit {
  @ViewChild('notificationPanel') notificationPanel!: ElementRef;
  
  isNotificationPanelOpen = false;

  notifications: Notification[] = [
    {
      id: '1',
      title: 'Giao dịch thành công',
      message: 'Bạn đã chuyển khoản 2,500,000 VND thành công',
      type: 'success',
      timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
      read: false,
      action: {
        label: 'Xem chi tiết',
        callback: () => console.log('View transaction details')
      }
    },
    {
      id: '2',
      title: 'Cảnh báo ngân sách',
      message: 'Bạn đã sử dụng 85% ngân sách tháng này',
      type: 'warning',
      timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
      read: false
    },
    {
      id: '3',
      title: 'Báo cáo tài chính',
      message: 'Báo cáo tài chính tháng 8 đã sẵn sàng',
      type: 'info',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      read: true,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '4',
      title: 'Thanh toán thất bại',
      message: 'Thanh toán hóa đơn điện không thành công',
      type: 'error',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      read: true,
      action: {
        label: 'Thử lại',
        callback: () => console.log('Retry payment')
      }
    },
  ];

  ngOnInit() {
    // Load notifications from service
  }

  toggleNotifications(event: Event) {
    event.stopPropagation();
    this.isNotificationPanelOpen = !this.isNotificationPanelOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    if (this.isNotificationPanelOpen && this.notificationPanel && 
        !this.notificationPanel.nativeElement.contains(event.target as Node)) {
      this.isNotificationPanelOpen = false;
    }
  }

  hasUnreadNotifications(): boolean {
    return this.notifications.some(n => !n.read);
  }

  getUnreadCount(): number {
    return this.notifications.filter(n => !n.read).length;
  }

  markAsRead(notification: Notification) {
    if (!notification.read) {
      notification.read = true;
      // Call API to update read status
    }
  }

  markAllAsRead() {
    this.notifications.forEach(n => n.read = true);
    // Call API to update all notifications
  }

  clearAll() {
    this.notifications = [];
    this.isNotificationPanelOpen = false;
    // Call API to clear notifications
  }

  getNotificationIcon(type: string): string {
    switch (type) {
      case 'success': return 'check_circle';
      case 'warning': return 'warning';
      case 'error': return 'error';
      default: return 'info';
    }
  }

  getNotificationIconClass(type: string): string {
    switch (type) {
      case 'success': return 'bg-green-100 text-green-600';
      case 'warning': return 'bg-yellow-100 text-yellow-600';
      case 'error': return 'bg-red-100 text-red-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  }

  getTimeAgo(timestamp: Date): string {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (minutes < 1) return 'Vừa xong';
    if (minutes < 60) return `${minutes} phút trước`;
    if (hours < 24) return `${hours} giờ trước`;
    return `${days} ngày trước`;
  }
}