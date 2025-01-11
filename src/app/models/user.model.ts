import { Book } from "./book.model";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    purchasedBooks: Book[];
  }
  