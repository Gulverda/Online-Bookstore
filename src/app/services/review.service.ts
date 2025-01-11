import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private reviews: { [bookId: string]: string[] } = {};

  getReviews(bookId: string): string[] {
    return this.reviews[bookId] || [];
  }

  addReview(bookId: string, review: string): void {
    if (!this.reviews[bookId]) {
      this.reviews[bookId] = [];
    }
    this.reviews[bookId].push(review);
  }
}
