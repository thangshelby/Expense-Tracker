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
import { AuthService } from '../../../core/services/auth.service';

@Component({
  standalone: true,
  selector: 'app-sign-up',
  imports: [
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUp {
  signUpForm = new FormGroup({
    fullname: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    gmail: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });
  constructor(private authService: AuthService) {}
  hidePassword = signal(false);
  toggleHidePassword() {
    this.hidePassword.set(!this.hidePassword());
  }

  onSubmit() {
    this.authService.onSignUp(this.signUpForm.value);
  }
}
