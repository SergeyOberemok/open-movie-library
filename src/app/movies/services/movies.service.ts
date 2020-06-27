import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URLS, API_URLS_TOKEN } from 'src/app/core/shared';
import { Filters } from 'src/app/shared';
import { Movie, MovieDto, MoviesResponse } from '../shared';

@Injectable()
export class MoviesService {
  public fetchMovies(
    filters: Filters = new Filters({ search: 'avengers' })
  ): Observable<Movie[]> {
    return this.http
      .get<MoviesResponse>(this.urls.movies, {
        params: filters.getHttpParams()
      })
      .pipe(
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
}
