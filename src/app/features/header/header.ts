import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../auth/auth.service';
import { User } from 'firebase/auth';
import { AvatarModule } from 'primeng/avatar';
import { Popover } from 'primeng/popover';
import { ButtonModule, Button } from 'primeng/button';
import { AsyncPipe, CommonModule } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Router } from '@angular/router';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Store, Select } from '@ngxs/store';
import { ToggleTheme, ThemeState } from '../../store/theme.state';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    AvatarModule,
    Popover,
    ConfirmDialogModule,
    DividerModule,
    ButtonModule,
    AsyncPipe,
    CommonModule,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  @Input() sidenavRef!: MatSidenav;
  user: User | null = null;

  items = [
    {
      key: 'edit_profile',
      icon: 'account_circle',
      title: 'Edit Profile',
    },
    {
      key: 'account_settings',
      icon: 'settings',
      title: 'Account Settings',
    },
    {
      key: 'support',
      icon: 'support',
      title: 'Support',
    },
  ];
  isDark$!: Observable<boolean>;

  constructor(
    private store: Store,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {}
  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
    this.isDark$ = this.store.select(ThemeState.isDarkMode);
  }
  onToggleTheme() {
    const body = document.querySelector('body');
    if (body) {
      body.classList.toggle('dark');
      body.classList.toggle('light');
    }
    this.store.dispatch(new ToggleTheme());
  }

  onToggleSidenav() {
    this.sidenavRef.toggle();
  }
  async onLogout() {
    await this.authService.logout();
    await this.router.navigate(['/welcome']);
  }

  @ViewChild('op') popover: any;
  isPopoverOpen = false;

  togglePopover(event: Event) {
    this.isPopoverOpen = !this.isPopoverOpen;
    this.popover.toggle(event);
  }

  confirm1(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure that you want to proceed?',
      header: 'Confirmation',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Save',
      },
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'You have accepted',
        });
        this.onLogout();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
