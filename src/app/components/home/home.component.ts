import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/book.model';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';  // Import Router
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  books: Book[] = [];

  constructor(
    private bookService: BookService,
    private router: Router  // Inject Router service
  ) {}

  ngOnInit(): void {
    this.books = this.bookService.getBooks();
  }

  // Method to navigate to book details page
  viewDetails(bookId: number): void {
    console.log('View details for book ID:', bookId);
    this.router.navigate(['/book', bookId]);  // Navigate to the book-details page
  }
}
