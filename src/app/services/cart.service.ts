import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: { book: Book; quantity: number }[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  addToCart(book: Book): void {
    const existingItem = this.cart.find(item => item.book.id === book.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cart.push({ book, quantity: 1 });
    }
    this.saveCartToStorage();
  }

  getCart(): { book: Book; quantity: number }[] {
    this.loadCartFromStorage();
    return this.cart;
  }

  updateCartQuantity(bookId: number, change: number): void {
    const item = this.cart.find(cartItem => cartItem.book.id === bookId.toString());
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        this.removeFromCart(bookId);
      }
      this.saveCartToStorage();
    }
  }

  removeFromCart(bookId: number): void {
    this.cart = this.cart.filter(cartItem => cartItem.book.id !== bookId.toString());
    this.saveCartToStorage();
  }

  calculateTotal(): number {
    return this.cart.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );
  }

  private saveCartToStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('cart', JSON.stringify(this.cart));
    }
  }

  private loadCartFromStorage(): void {
    if (isPlatformBrowser(this.platformId)) {
      const storedCart = localStorage.getItem('cart');
      this.cart = storedCart ? JSON.parse(storedCart) : [];
    }
  }
}
