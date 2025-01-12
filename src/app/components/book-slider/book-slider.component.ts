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
  visibleCount: number = 1; // Always show 1 book at a time, not 4
  
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
    this.updateVisibleBooks();
  }

  next() {
    if (this.currentIndex < 3) {
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
      this.currentIndex = 3; // Loop to the end of the first 4 books
    }
    this.updateVisibleBooks();
  }

  updateVisibleBooks() {
    // Only show the first 4 books, based on current index
    const maxBooksToShow = 4;
    this.visibleBooks = this.books.slice(0, maxBooksToShow).slice(this.currentIndex, this.currentIndex + 1); // Show only 1 book at a time
  }

  isAtStart(): boolean {
    return this.currentIndex === 0;
  }

  isAtEnd(): boolean {
    return this.currentIndex >= 3; // End after the 4th book
  }
  
  getLineClass(index: number): string {
    return index === this.currentIndex ? 'line active' : 'line'; // Add 'active' class for the selected slide
  }
}
