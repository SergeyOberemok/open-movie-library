import { Injectable } from '@angular/core';
import {
  InMemoryDbService,
  RequestInfo,
  STATUS
} from 'angular-in-memory-web-api';
import { MoviesResponse } from '../movies/shared';
import { SEARCH_MOVIES_RESPONSE, SEARCH_BOOKS_RESPONSE } from 'src/mocks';

@Injectable({
  providedIn: 'root'
})
export class InMemoryMockService implements InMemoryDbService {
  constructor() {}

  createDb() {
    const movies: MoviesResponse = SEARCH_MOVIES_RESPONSE;
    const books = SEARCH_BOOKS_RESPONSE;

    return { movies, books };
  }

  get(requestInfo: RequestInfo) {
    return requestInfo.utils.createResponse$(() => ({
      body: requestInfo.collection,
      status: STATUS.OK,
      headers: requestInfo.headers,
      url: requestInfo.url
    }));
  }
}
