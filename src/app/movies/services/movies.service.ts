import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MoviesResponse, Movie, MovieDto } from '../shared';
import { API_URLS_TOKEN, API_URLS } from 'src/app/core/shared';

@Injectable()
export class MoviesService {
  constructor(
    private http: HttpClient,
    @Inject(API_URLS_TOKEN) private urls: API_URLS
  ) {}

  public fetchMovies(): Observable<Movie[]> {
    return this.http
      .get<MoviesResponse>(this.urls.movies)
      .pipe(
        map((response: MoviesResponse) =>
          response.Search.map((movie: MovieDto) =>
            Object.assign(new Movie(), movie)
          )
        )
      );
  }
}
