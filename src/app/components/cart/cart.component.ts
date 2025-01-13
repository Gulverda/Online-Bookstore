import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
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

  constructor(private cartService: CartService) {}

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
    return this.cartService.calculateTotal();
  }
}