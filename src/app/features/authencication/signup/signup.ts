import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ReactiveFormsModule,
  AbstractControl,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.html',
  styleUrls: ['./signup.css'],
  imports: [CheckboxModule, ReactiveFormsModule, FormsModule],
})
export class Signup {
  signupForm: FormGroup;
  loading = false;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.signupForm = new FormGroup(
      {
        fullname: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', Validators.required),
        agreeToTerms: new FormControl(false, Validators.requiredTrue),
        receiveUpdates: new FormControl(false),
      },
      {
        //   { validators: this.passwordMatchValidator },
      },
    );
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value !== confirmPassword.value ? { mismatch: true } : null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.loading = true;
      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        // Handle signup logic here
        console.log('Signup data:', this.signupForm.value);
        // Redirect to verification page or dashboard
        this.router.navigate(['/login']);
      }, 2000);
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  navigateToLogin() {
    this.router.navigate(['/welcome/log-in']);
  }

  getFieldError(fieldName: string): string {
    const field = this.signupForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) {
        const fieldNames: { [key: string]: string } = {
          fullName: 'Họ tên',
          email: 'Email',
          password: 'Mật khẩu',
          confirmPassword: 'Xác nhận mật khẩu',
        };
        return `${fieldNames[fieldName]} là bắt buộc`;
      }
      if (field.errors['email']) {
        return 'Email không hợp lệ';
      }
      if (field.errors['minlength']) {
        return fieldName === 'fullName'
          ? 'Họ tên phải có ít nhất 2 ký tự'
          : 'Mật khẩu phải có ít nhất 6 ký tự';
      }
      if (field.errors['requiredTrue']) {
        return 'Bạn phải đồng ý với điều khoản sử dụng';
      }
    }

    if (
      fieldName === 'confirmPassword' &&
      this.signupForm.errors?.['mismatch'] &&
      field?.touched
    ) {
      return 'Mật khẩu xác nhận không khớp';
    }

    return '';
  }
}
