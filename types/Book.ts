export enum BooksStatus {
  ABSENT,
  HOLD,
  OPEN,
  SWAPPING,
  EXTRACTED
}

export enum BooksCondition {
  BRANDNEW = "BRANDNEW",
  LIKENEW = "LIKENEW",
  GOOD = "GOOD",
  SATISFACTORY = "SATISFACTORY",
  BAD = "BAD",
  TERRIBLE = "TERRIBLE"
}

export type Book = {
  title: string;
  description: string;
  id: string;
  authors?: string[];
  status: BooksStatus;
  condition: BooksCondition;
  booksCount: number;
  image?: string;
  isbn_13?: string | null;
  isbn_10?: string | null;
  publishedDate?: string | null;
}
