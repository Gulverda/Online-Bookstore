import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { ReviewService } from '../../services/review.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css'],
})
export class BookDetailsComponent implements OnInit {
  book: Book | undefined;
  reviews: string[] = [];
  newReview: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private reviewService: ReviewService
  ) {}

  ngOnInit(): void {
    const bookId = this.route.snapshot.paramMap.get('id');
    if (bookId) {
      this.book = this.bookService.getBookById(bookId);
      this.reviews = this.reviewService.getReviews(bookId);
    }
  }

  addReview() {
    if (this.book && this.newReview.trim()) {
      this.reviewService.addReview(this.book.id, this.newReview);
      this.newReview = '';
      this.reviews = this.reviewService.getReviews(this.book.id);
    }
  }
}
