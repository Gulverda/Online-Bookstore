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
  language: string;
  printLength: number; // Optional property
  similarBooks: string[]; // Array of similar book IDs
  additionalImages: string[]; // Optional property
  reviews: {
    reviewer: string;   // Name of the reviewer
    comment: string;    // Review comment
    date: Date;         // Date of the review
  }[];                  // Array of review objects
  publicationDate: Date; // Optional property
}
