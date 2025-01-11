import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
    {
      id: '1',
      title: 'Angular Basics',
      author: 'John Doe',
      price: 25,
      description: 'Learn Angular',
      releaseYear: 2022,
      category: 'Programming',
      imageUrl: '/assets/angular.png',
      rating: 4.5,
      similarBooks: [],
      reviews: [],
    },
    {
      id: '2',
      title: 'React Essentials',
      author: 'Jane Smith',
      price: 30,
      description: 'Learn React',
      releaseYear: 2023,
      category: 'Programming',
      imageUrl: '/assets/react.png',
      rating: 4.8,
      similarBooks: [],
      reviews: [],
    },
    // Add more books as needed...
  ];

  private cart: Book[] = [];

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  getSimilarBooks(category: string): Book[] {
    return this.books.filter((book) => book.category === category);
  }

  getCart(): Book[] {
    return [...this.cart];
  }

  addToCart(book: Book): void {
    this.cart.push(book);
  }

  removeFromCart(id: string): void {
    this.cart = this.cart.filter((book) => book.id !== id);
  }
}
