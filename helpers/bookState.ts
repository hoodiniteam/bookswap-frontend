import { BookForm } from '../types/Book';
import { BooksCondition } from '../generated/graphql.d';

export const emptyState: BookForm = {
  editionId: '',
  indexId: '',
  id: '',
  title: '',
  description: '',
  image: '',
  isbn_13: null,
  isbn_10: null,
  authors: [],
  condition: BooksCondition.Likenew,
  publishedDate: '',
};
