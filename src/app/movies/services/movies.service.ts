import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_URLS, API_URLS_TOKEN } from 'src/app/core/shared';
import { Filters } from 'src/app/shared';
import { Movie, MovieDto, MoviesResponse } from '../shared';

@Injectable()
export class MoviesService {
  public fetchMovies(filters: Filters = new Filters()): Observable<Movie[]> {
    if (!filters.search) {
      filters.search = 'avengers';
    }

    const queryParams: string = filters
      .getHttpParams([['apikey', '37e6946a']])
      .toString();

    return this.http
      .get<MoviesResponse>(this.urls.movies, {
        params: new HttpParams({
          fromString: this.prepareQueryStringForOMDb(queryParams)
        })
      })
      .pipe(
        map((response: MoviesResponse | any) =>
          response.Error !== undefined ? throwError('response.Error') : response
        ),
        map((response: MoviesResponse) =>
          response.Search.map((movie: MovieDto) =>
            Object.assign(new Movie(), movie)
          )
        )
      );
  }

  constructor(
    private http: HttpClient,
    @Inject(API_URLS_TOKEN) private urls: API_URLS
  ) {}

  private prepareQueryStringForOMDb(queryString: string): string {
    return queryString.replace('search', 's').replace('year', 'y');
  }
}
