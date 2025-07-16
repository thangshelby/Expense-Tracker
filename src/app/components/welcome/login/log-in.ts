import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { WelcomeLoader } from '../../../shared/welcome-loader/welcome-loader';

@Component({
  selector: 'app-log-in',
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    WelcomeLoader,
  ],
  templateUrl: './log-in.html',
  styleUrl: './log-in.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogIn {
  loginContinue = signal(false);
  hidePassword = signal(true);
  loginForm = new FormGroup({
    gmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(private authService: AuthService) {}

  toggleHidePassword() {
    this.hidePassword.set(!this.hidePassword());
  }

  onSubmit() {
    if (this.loginForm.valid && this.loginForm.touched) {
      this.loginContinue.set(true);
      this.authService
        .onLogIn(this.loginForm.value)
        .then(() => {
          this.loginContinue.set(false);
          console.log('login success');
        })
        .catch(() => {
          this.loginContinue.set(false);
        })
        .finally(() => {
          this.loginContinue.set(false);
        });
    }
  }
}
