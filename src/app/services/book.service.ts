import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
    { id: '1', title: 'Angular Basics', author: 'John Doe', price: 25, description: 'Learn Angular', releaseYear: 2022, category: 'Programming', imageUrl: '/assets/angular.png', rating: 4.5 },
    { id: '2', title: 'React Essentials', author: 'Jane Smith', price: 30, description: 'Learn React', releaseYear: 2023, category: 'Programming', imageUrl: '/assets/react.png', rating: 4.8 },
  ];

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  private cart: any[] = []; // Add this property to your BookService

getCart() {
  return [...this.cart]; // Return a copy of the cart to avoid accidental mutations
}

addToCart(book: any) {
  this.cart.push(book);
}

removeFromCart(id: number) {
  this.cart = this.cart.filter((item) => item.id !== id);
}

}
