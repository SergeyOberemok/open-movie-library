import { BookDto } from './book';

export interface BooksResponse {
  start: number;
  num_found: number;
  numFound: number;
  docs: BookDto[];
}
