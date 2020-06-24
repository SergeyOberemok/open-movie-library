import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { MoviesResponse } from '../movies/shared';
import { SEARCH_MOVIES_RESPONSE, SEARCH_BOOKS_RESPONSE } from 'src/mocks';

@Injectable({
  providedIn: 'root',
})
export class InMemoryMockService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const movies: MoviesResponse = SEARCH_MOVIES_RESPONSE;
    const books = SEARCH_BOOKS_RESPONSE;

    return { movies, books };
  }
}
