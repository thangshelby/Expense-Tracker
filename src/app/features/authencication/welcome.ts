import { Component } from '@angular/core';
import {
  RouterOutlet,
  RouterLink,
  ActivatedRoute,
  Router,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../auth/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-welcome',
  imports: [
    RouterOutlet,
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    ToastModule,
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  currentChildRoute: string | undefined;
  appVersion = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private messageService: MessageService,
  ) {
    this.appVersion = 'v.1.2.0';
    this.router.events.subscribe(() => {
      const child = this.route.firstChild;
      this.currentChildRoute = child?.snapshot.routeConfig?.path;
    });
  }

  async onGoogleLogin(): Promise<void> {
    try {
      await this.authService.googleLogin();
      await this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
      await this.showError();
    }
  }

  async onGithublogin() {
    try {
      await this.authService.githubLogin();
      await this.router.navigate(['/']);
    } catch (error) {
      console.log(error);
      await this.showError();
    }
  }

  showSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Thành công',
      detail: 'Đăng nhập thành công!',
      life: 3000,
    });
  }

  showError() {
    this.messageService.add({
      severity: 'error',
      summary: 'Lỗi',
      detail: 'Đăng nhập thất bại!',
    });
  }

  isLogging = false;
  onGithub() {}
  onLinkedin() {}
}
