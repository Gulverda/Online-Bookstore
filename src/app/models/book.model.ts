export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    description: string;
    releaseYear: number;
    category: string;
    imageUrl: string;
    rating: number;
    similarBooks: Book[];  // Add similar books reference
    reviews: string[];     // Array to store reviews
  }
  