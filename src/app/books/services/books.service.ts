import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URLS, API_URLS_TOKEN } from 'src/app/core/shared';
import { Filters } from 'src/app/shared';
import { Book, BookDto, BooksResponse } from '../shared';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  public fetchBooks(
    filters: Filters = new Filters({ search: 'lord of the ring' })
  ): Observable<Book[]> {
    return this.http
      .get<BooksResponse>(this.urls.books, { params: filters.getHttpParams() })
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
