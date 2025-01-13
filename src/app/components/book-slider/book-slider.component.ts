import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Book } from '../../models/book.model'; // Adjust the path as per your project structure
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { BookService } from '../../services/book.service'; // Fixed import to follow naming conventions

@Component({
  selector: 'app-book-slider',
  imports: [CommonModule],
  templateUrl: './book-slider.component.html',
  styleUrls: ['./book-slider.component.css'],
})
export class BookSliderComponent implements OnInit, OnDestroy {
  @Input() books: Book[] = [];
  visibleBooks: Book[] = [];
  currentIndex: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private bookService: BookService // Injected BookService for cart functionality
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleBooks();
      window.addEventListener('resize', this.handleResize.bind(this));
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
    if (this.currentIndex < this.books.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the start
    }
    this.updateVisibleBooks();
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.books.length - 1; // Loop back to the last book
    }
    this.updateVisibleBooks();
  }

  updateVisibleBooks() {
    this.visibleBooks = [this.books[this.currentIndex]]; // Show only the book at the current index
  }

  isAtStart(): boolean {
    return this.currentIndex === 0;
  }

  isAtEnd(): boolean {
    return this.currentIndex === this.books.length - 1;
  }

  getLineClass(index: number): string {
    return index === this.currentIndex ? 'line active' : 'line';
  }

  addToCart(book: Book): void {
    this.bookService.addToCart(book);
    alert(`${book.title} added to your cart!`);
  }
}
