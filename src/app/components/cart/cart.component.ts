import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
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
  cartItems: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.bookService.getCart();
  }

  removeItem(id: number): void {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      this.bookService.removeFromCart(id);
      this.loadCart(); // Refresh the cart items after removal
    }
  }
}
