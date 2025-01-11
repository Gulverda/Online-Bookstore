import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model'; // Ensure the model is imported
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
  cartItems: Book[] = []; // Cart items will be of type Book

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.bookService.getCart(); // Fetch the current cart items
  }

  removeItem(id: string): void {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      this.bookService.removeFromCart(id); // Remove the item by its ID
      this.loadCart(); // Refresh the cart items after removal
    }
  }
}
