import { Injectable, Inject } from '@angular/core';
import { API_URLS_TOKEN, API_URLS } from 'src/app/core/shared';
import { Observable } from 'rxjs';
import { Book, BooksResponse, BookDto } from '../shared';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public fetchBooks(): Observable<Book[]> {
    return this.http
      .get<BooksResponse>(this.urls.books)
      .pipe(
        map((response: BooksResponse) =>
          response.docs.map((book: BookDto) => Object.assign(new Book(), book))
        )
      );
  }

  constructor(
    private http: HttpClient,
    @Inject(API_URLS_TOKEN) private urls: API_URLS
  ) {}
}
