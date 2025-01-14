import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit, OnDestroy {
  book: Book | undefined;
  similarBooks: Book[] = [];
  reviews: string[] = [];
  newReview: string = '';
  private routeSub: Subscription | undefined;
  quantity: number = 1;


  fullStars: number = 0;
  halfStars: number = 0;
  emptyStars: number = 0;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private bookService: BookService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const bookId = params.get('id');
      if (bookId) {
        this.loadBookDetails(bookId);
      } else {
        console.error('Invalid book ID in route parameters.');
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  async loadBookDetails(bookId: string): Promise<void> {
    try {
      const book = await this.bookService.getBookById(bookId);
      if (!book) {
        console.error(`Book with ID ${bookId} not found.`);
        return;
      }
      this.book = book;
      this.similarBooks = await this.bookService.getSimilarBooks(book.category);
      this.reviews = await this.reviewService.getReviews(bookId);
      
      // Calculate stars after book details are loaded
      this.calculateStars(this.book.rating);
    } catch (error) {
      console.error('Error loading book details:', error);
    }
  }

  async addReview(): Promise<void> {
    if (this.book && this.newReview.trim()) {
      if (this.newReview.length > 200) {
        console.error('Review cannot exceed 200 characters.');
        return;
      }
      try {
        await this.reviewService.addReview(this.book.id, this.newReview);
        this.reviews.push(this.newReview);
        this.newReview = '';
      } catch (error) {
        console.error('Failed to add review:', error);
      }
    }
  }

  increaseQuantity(): void {
    this.quantity++;
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.book) {
      this.cartService.addToCart(this.book, this.quantity);
      alert(`${this.book.title} added to cart!`);
    }
  }

  calculateStars(rating: number): void {
    this.fullStars = Math.floor(rating);
    this.halfStars = rating % 1 >= 0.5 ? 1 : 0;
    this.emptyStars = 5 - this.fullStars - this.halfStars;
  }
}
