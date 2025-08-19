import { Component } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
  imports: [CheckboxModule, FormsModule, ReactiveFormsModule],
})
export class Login {
  loginForm: FormGroup;
  loading = false;
  showPassword = false;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      rememberMe: new FormControl(false),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading = true;
      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        // Handle login logic here
        console.log('Login data:', this.loginForm.value);
        // Redirect to dashboard
        this.router.navigate(['/dashboard']);
      }, 2000);
    }
  }

  async onGoogleSignIn(): Promise<void> {
    try {
      await this.authService.googleLogin();
      this.router.navigateByUrl('/main');
    } catch (error) {
      console.error('Google Sign-In error:', error);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  navigateToSignup() {
    this.router.navigate(['/welcome/sign-up']);
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        return `${fieldName === 'email' ? 'Email' : 'Mật khẩu'} là bắt buộc`;
      }
      if (field.errors['email']) {
        return 'Email không hợp lệ';
      }
      if (field.errors['minlength']) {
        return 'Mật khẩu phải có ít nhất 6 ký tự';
      }
    }
    return '';
  }
}
