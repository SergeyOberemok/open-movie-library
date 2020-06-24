import { MovieDto } from './movie';

export interface MoviesResponse {
  Search: MovieDto[],
  totalResults: string;
  Response: string;
}