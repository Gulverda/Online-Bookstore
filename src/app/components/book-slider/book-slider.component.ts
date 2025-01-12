import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Book } from '../../models/book.model'; // Adjust the path as per your project structure
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-book-slider',
  imports: [CommonModule],
  templateUrl: './book-slider.component.html',
  styleUrls: ['./book-slider.component.css']
})
export class BookSliderComponent implements OnInit, OnDestroy {
  @Input() books: Book[] = [];
  visibleBooks: Book[] = [];
  currentIndex: number = 0;
  visibleCount: number = 1; // Always show 1 book at a time

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleBooks();
      window.addEventListener('resize', this.handleResize.bind(this)); // Listen for window resize
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.handleResize.bind(this));
    }
  }

  handleResize() {
    // No need to change visibleCount since it's always 1, just update visible books
    this.updateVisibleBooks();
  }

  next() {
    if (this.currentIndex < this.books.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to start
    }
    this.updateVisibleBooks();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.books.length - 1; // Loop to the end
    }
    this.updateVisibleBooks();
  }

  updateVisibleBooks() {
    this.visibleBooks = this.books.slice(this.currentIndex, this.currentIndex + this.visibleCount);
  }

  isAtStart(): boolean {
    return this.currentIndex === 0;
  }

  isAtEnd(): boolean {
    return this.currentIndex >= this.books.length - 1;
  }
}
