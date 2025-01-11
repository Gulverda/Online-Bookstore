import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';  // Import Router
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  email = '';
  password = '';
  name = '';
  isLogin = true;

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode(event: Event) {
    event.preventDefault();
    this.isLogin = !this.isLogin;
    this.resetFields();
  }

  submit() {
    const trimmedEmail = this.email.trim();
    const trimmedPassword = this.password.trim();

    if (!trimmedEmail || !trimmedPassword) {
      alert('Email and Password are required.');
      return;
    }

    if (this.isLogin) {
      const success = this.authService.login(trimmedEmail, trimmedPassword);
      if (success) {
        alert('Login successful!');
        this.router.navigate(['/']);  // Redirect to Home after login
      } else {
        alert('Invalid credentials.');
      }
    } else {
      if (!this.name.trim()) {
        alert('Name is required for registration.');
        return;
      }
      this.authService.register({
        id: Date.now().toString(),
        name: this.name.trim(),
        email: trimmedEmail,
        password: trimmedPassword,
        purchasedBooks: []
      });
      alert('Registration successful!');
      this.isLogin = true;
      this.resetFields();
    }
  }

  private resetFields() {
    this.email = '';
    this.password = '';
    this.name = '';
  }
}
