import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import { MoviesService } from '../services/movies.service';
import { Movie } from '../shared';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {
  public movies$: Observable<Movie[]>;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.movies$ = this.moviesService.fetchMovies();
  }
}
