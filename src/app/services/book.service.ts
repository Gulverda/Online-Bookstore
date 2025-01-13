import { Injectable } from '@angular/core';
import { Book } from '../models/book.model';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private books: Book[] = [
    {
      id: '1',
      title: 'The Lord of the Rings: The Fellowship of the Ring',
      author: 'J.R.R. Tolkien',
      price: 15.33,
      description: 'A young hobbit, Frodo Baggins, finds himself the unexpected bearer of the One Ring, an evil artifact that must be destroyed to save Middle-earth.',
      releaseYear: 1954,
      category: 'Fantasy',
      imageUrl: '/assets/books/lotr.png',
      rating: 4.9,
      similarBooks: ['2', '3', '4'],
      reviews: [
        {
          reviewer: 'John Doe',
          comment: 'A timeless classic!',
          date: new Date('2022-01-01'),
        },
        {
          reviewer: 'Jane Smith',
          comment: 'Engrossing and imaginative.',
          date: new Date('2022-03-15'),
        },
      ],
    },
    {
      id: '2',
      title: 'The Lord of the Rings: The Two Towers',
      author: 'J.R.R. Tolkien',
      price: 15.57,
      description: 'Frodo and Sam continue their perilous journey, while Aragorn, Legolas, and Gimli battle the forces of Mordor.',
      releaseYear: 1954,
      category: 'Fantasy',
      imageUrl: '/assets/books/the_two_towers.png',
      rating: 4.8,
      similarBooks: ['1', '3', '4'],
      reviews: [],
    },
    {
      id: '3',
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      price: 12.05,
      description: 'Bilbo Baggins, a hobbit, embarks on an adventure to help a group of dwarves reclaim their mountain home from a dragon.',
      releaseYear: 1937,
      category: 'Fantasy',
      imageUrl: '/assets/books/the_hobbit.png',
      rating: 4.7,
      similarBooks: ['1', '2', '4'],
      reviews: [
        {
          reviewer: 'Sam Green',
          comment: 'A delightful adventure for all ages!',
          date: new Date('2023-06-10'),
        },
      ],
    },
    {
      id: '4',
      title: 'Harry Potter and the Sorcerer\'s Stone',
      author: 'J.K. Rowling',
      price: 20.48,
      description: 'A young boy discovers that he is a wizard and attends Hogwarts School of Witchcraft and Wizardry.',
      releaseYear: 1997,
      category: 'Fantasy',
      imageUrl: '/assets/books/hp_tps.png',
      rating: 4.9,
      similarBooks: ['1', '2', '3'],
      reviews: [
        {
          reviewer: 'Lucy Evans',
          comment: 'A magical start to a legendary series.',
          date: new Date('2023-07-05'),
        },
      ],
    },
    {
      id: '5',
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      price: 10.99,
      description: 'A young man reflects on his experiences and struggles with alienation, identity, and the complexities of life.',
      releaseYear: 1951,
      category: 'Fiction',
      imageUrl: '/assets/books/tcitr.png',
      rating: 4.5,
      similarBooks: ['6', '7', '8'],
      reviews: [
        {
          reviewer: 'Michael Black',
          comment: 'A deep and introspective story.',
          date: new Date('2022-10-12'),
        },
      ],
    },
    {
      id: '6',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 18.58,
      description: 'A young girl witnesses her father, a lawyer, defend a black man accused of raping a white woman in the racially charged American South.',
      releaseYear: 1960,
      category: 'Fiction',
      imageUrl: '/assets/books/tkm.png',
      rating: 4.8,
      similarBooks: ['5', '7', '8'],
      reviews: [
        {
          reviewer: 'Emma White',
          comment: 'A powerful and thought-provoking novel.',
          date: new Date('2021-09-20'),
        },
      ],
    },
    {
      id: '7',
      title: '1984',
      author: 'George Orwell',
      price: 14.39,
      description: 'In a dystopian future, a totalitarian regime controls every aspect of life, and one man seeks to rebel against the oppressive system.',
      releaseYear: 1949,
      category: 'Dystopian',
      imageUrl: '/assets/books/1984.png',
      rating: 4.6,
      similarBooks: ['5', '6', '8'],
      reviews: [],
    },
    {
      id: '8',
      title: 'Brave New World',
      author: 'Aldous Huxley',
      price: 16.06,
      description: 'A futuristic society prioritizes happiness through control and conformity, but one individual challenges the system.',
      releaseYear: 1932,
      category: 'Dystopian',
      imageUrl: '/assets/books/bnw.png',
      rating: 4.4,
      similarBooks: ['5', '6', '7'],
      reviews: [
        {
          reviewer: 'William Black',
          comment: 'A chilling vision of a controlled society.',
          date: new Date('2023-04-11'),
        },
      ],
    },
    // Add more books as needed
  ];

  constructor(private cartService: CartService) {}

  getBooks(): Book[] {
    return this.books;
  }

  getBookById(id: string): Book | undefined {
    return this.books.find((book) => book.id === id);
  }

  getSimilarBooks(category: string): Book[] {
    return this.books.filter((book) => book.category === category);
  }

  // For adding to the cart
  addToCart(book: Book): void {
    this.cartService.addToCart(book);
  }
}