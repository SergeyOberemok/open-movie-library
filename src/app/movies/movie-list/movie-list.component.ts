import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from 'src/app/reducers';
import * as MoviesAction from '../actions';
import * as fromMovies from '../reducers';
import { Movie } from '../shared';


@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit {
  public movies$: Observable<Movie[]>;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.movies$ = this.store.pipe(select(fromMovies.selectMovies));

    this.store.dispatch(MoviesAction.loadMovies());
  }
}
