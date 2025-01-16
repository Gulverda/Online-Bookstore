import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [];
  private currentUser: { user: User; expiry: number } | null = null;
  private sessionTimeout: number = 60 * 60 * 1000; // 1 hour in milliseconds

  constructor() {
    // Load users and currentUser from localStorage if available
    const savedUsers = localStorage.getItem('users');
    const savedCurrentUser = localStorage.getItem('currentUser');

    if (savedUsers) {
      this.users = JSON.parse(savedUsers);
    }

    if (savedCurrentUser) {
      const currentUserData = JSON.parse(savedCurrentUser);
      const now = new Date().getTime();

      // Check if the session is still valid
      if (currentUserData.expiry > now) {
        this.currentUser = currentUserData;
      } else {
        // Clear expired session
        localStorage.removeItem('currentUser');
      }
    }
  }

  register(user: User): boolean {
    if (this.users.some((u) => u.email === user.email)) {
      return false; // User already exists
    }

    this.users.push(user);
    localStorage.setItem('users', JSON.stringify(this.users));
    return true; // Registration successful
  }

  login(email: string, password: string): boolean {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (user) {
      const expiry = new Date().getTime() + this.sessionTimeout;
      this.currentUser = { user, expiry };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return true; // Login successful
    }
    return false; // Invalid credentials
  }

  getCurrentUser(): User | null {
    if (this.currentUser) {
      const now = new Date().getTime();
      if (this.currentUser.expiry > now) {
        return this.currentUser.user;
      } else {
        // Session expired
        this.logout();
      }
    }
    return null;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }
}
