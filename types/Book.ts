export enum BooksStatus {
  ABSENT,
  HOLD,
  OPEN,
  SWAPPING,
  EXTRACTED
}

export enum BooksCondition {
  BRANDNEW,
  LIKENEW,
  GOOD,
  SATISFACTORY,
  BAD,
  TERRIBLE
}

export type Book = {
  title: string;
  description: string;
  id: string;
  authors?: string[];
  status: BooksStatus;
  condition: BooksCondition;
  image?: string;
  isbn_13?: string | null;
  isbn_10?: string | null;
  publishedDate?: string | null;
}
