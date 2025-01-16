import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Book } from '../../models/book.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cartItems: { book: Book; quantity: number }[] = [];
  paymentSuccessful: boolean = false; // Track payment status

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCart();
  }

  increaseQuantity(bookId: number): void {
    this.cartService.updateCartQuantity(bookId, 1);
    this.loadCart();
  }

  decreaseQuantity(bookId: number): void {
    this.cartService.updateCartQuantity(bookId, -1);
    this.loadCart();
  }

  removeItem(bookId: number): void {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      this.cartService.removeFromCart(bookId);
      this.loadCart();
    }
  }

  calculateTotal(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.book.price * item.quantity,
      0
    );
  }

  handleBuyNow(): void {
    if (this.authService.isLoggedIn()) {
      alert('Payment successfully completed!');
      this.paymentSuccessful = true; // Mark payment as successful
    } else {
      alert('You need to log in to proceed.');
      this.router.navigate(['/login']); // Navigate to the login page
    }
  }
}
