import { Component, OnInit } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { SideNavbar } from './components/side-navbar/side-navbar';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-default-layuout',
  imports: [RouterOutlet, MatSidenavModule, Header, SideNavbar, CommonModule],
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
  track = true;
}
