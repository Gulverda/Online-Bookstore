import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

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

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    // Subscribe to route parameter changes
    this.routeSub = this.route.paramMap.subscribe((params) => {
      const bookId = params.get('id');
      if (bookId) {
        this.loadBookDetails(bookId);  // Load book details whenever the route changes
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the route changes to avoid memory leaks
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  loadBookDetails(bookId: string): void {
    // Fetch the current book details
    this.book = this.bookService.getBookById(bookId);
    
    if (this.book) {
      // Fetch similar books (exclude the current book)
      this.similarBooks = this.bookService.getSimilarBooks(this.book.category);
      // Fetch the reviews for the current book
      this.reviews = this.reviewService.getReviews(bookId);
    }
  }

  addReview(): void {
    if (this.book && this.newReview.trim()) {
      this.reviewService.addReview(this.book.id, this.newReview);
      this.newReview = '';  // Clear the review input
      this.reviews = this.reviewService.getReviews(this.book.id);  // Refresh the reviews list
    }
  }
}
