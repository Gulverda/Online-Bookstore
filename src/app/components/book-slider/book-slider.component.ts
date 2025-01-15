import { Component, Input, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { Book } from '../../models/book.model'; 
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { BookService } from '../../services/book.service';

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
  totalBooksToDisplay: number = 4; 
  booksPerPage: number = 1; 

  private autoMoveInterval: any;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private bookService: BookService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateVisibleBooks();
      window.addEventListener('resize', this.handleResize.bind(this));

      // Auto-move slider every 2-3 seconds
      this.autoMoveInterval = setInterval(() => {
        this.next();
      }, 3000); 
    }
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.handleResize.bind(this));

      // Clear the auto-move interval on destroy
      if (this.autoMoveInterval) {
        clearInterval(this.autoMoveInterval);
      }
    }
  }

  handleResize() {
    this.updateVisibleBooks();
  }

  next() {
    if (this.currentIndex < this.totalBooksToDisplay - 1) {
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
      this.currentIndex = this.totalBooksToDisplay - 1; // Loop back to the last book
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
    return this.currentIndex === this.totalBooksToDisplay - 1;
  }

  getLineClass(index: number): string {
    return index === this.currentIndex ? 'line active' : 'line';
  }

  addToCart(book: Book): void {
    this.bookService.addToCart(book);
    alert(`${book.title} added to your cart!`);
  }
}
