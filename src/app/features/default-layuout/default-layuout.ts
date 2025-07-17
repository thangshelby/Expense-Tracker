import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { SideNavbar } from '../side-navbar/side-navbar';
import { AuthService } from '../../auth/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-default-layuout',
  imports: [RouterOutlet, MatSidenavModule, Header, SideNavbar, ToastModule],
  templateUrl: './default-layuout.html',
  styleUrl: './default-layuout.css',
})
export class DefaultLayout implements OnInit {
  constructor(
    private authService: AuthService,
    private messageService: MessageService,
  ) {}
  ngOnInit(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Chào mừng!',
      detail: 'Bạn đã vào trang Welcome thành công!',
      life: 3000,
    });
  }
  checked = false;
}
