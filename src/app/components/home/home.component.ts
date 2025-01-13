import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookSliderComponent } from '../book-slider/book-slider.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, BookSliderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  addToCart(book: Book): void {
    this.bookService.addToCart(book);
    alert(`${book.title} added to your cart!`);
  }

  viewDetails(bookId: string): void {
    this.router.navigate(['/book', bookId]);
  }
}