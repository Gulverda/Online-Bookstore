import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service'; 
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menuOpen: boolean = false;
  cartQuantity: number = 0;
  searchQuery: string = '';  // Holds the input from the search bar
  filteredBooks: any[] = []; // Holds the filtered list of books

  constructor(
    public authService: AuthService,
    public cartService: CartService,
    private bookService: BookService,  // Inject BookService
    private router: Router  // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    this.updateCartQuantity();
  }

  /**
   * Toggles the mobile menu open/close state
   */
  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  /**
   * Logs the user out
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * Updates the cart quantity by fetching it from the CartService
   */
  private updateCartQuantity(): void {
    this.cartQuantity = this.cartService.getCartQuantity();
  }

  /**
   * Filters books based on the search query
   */
  onSearchChange(): void {
    if (this.searchQuery.trim() === '') {
      this.filteredBooks = [];  // Clear results if query is empty
    } else {
      this.filteredBooks = this.bookService.searchBooksByName(this.searchQuery);
    }
  }

  /**
   * Navigate to the book details page on click
   */
  viewDetails(bookId: string): void {
    // Navigate to the book details page using the book ID
    this.router.navigate(['/book', bookId]);  // Assumes a route with book details
  }
}
