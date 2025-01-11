import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [];
  private currentUser: User | null = null;

  constructor() {
    // Load users and currentUser from localStorage if available
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedUsers = localStorage.getItem('users');
      if (savedUsers) {
        this.users = JSON.parse(savedUsers);
      }

      const savedCurrentUser = localStorage.getItem('currentUser');
      if (savedCurrentUser) {
        this.currentUser = JSON.parse(savedCurrentUser);
      }
    }
  }

  register(user: User) {
    // Check if the user already exists
    if (this.users.some((u) => u.email === user.email)) {
      return false; // User already exists
    }

    // Add the user to the users array
    this.users.push(user);

    // Save the updated users list to localStorage
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('users', JSON.stringify(this.users));
    }

    return true; // Registration successful
  }

  login(email: string, password: string): boolean {
    const user = this.users.find((u) => u.email === email && u.password === password);
    if (user) {
      this.currentUser = user;
      
      // Save currentUser to localStorage
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      }

      return true; // Login successful
    }

    return false; // Invalid credentials
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  logout(): void {
    this.currentUser = null;
    // Remove currentUser from localStorage if available
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('currentUser');
    }
  }  
}
