import { BookEdition, BooksCondition } from '../generated/graphql.d';

export enum BooksStatus {
  ABSENT,
  HOLD,
  OPEN,
  SWAPPING,
  EXTRACTED
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

export type BookForm = Omit<
  BookEdition,
  | 'books'
  | 'booksCount'
  | 'createdAt'
  | 'expects'
  | 'updatedAt'
  | 'views'
  | 'virtual'
  > & {
  condition: BooksCondition;
  editionId: string;
  indexId: string;
};
