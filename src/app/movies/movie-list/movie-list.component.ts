import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { select, Store, ActionsSubject } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromApp from 'src/app/reducers';
import * as MoviesAction from '../actions';
import { selectMovies } from '../selectors';
import { Movie } from '../shared';
import * as SavedItemsAction from '../../saved-items/actions';
import { ofType } from '@ngrx/effects';
import * as AppAction from 'src/app/actions';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit, OnDestroy {
  public movies$: Observable<Movie[]>;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromApp.State>,
    private actions$: ActionsSubject
  ) {}

  ngOnInit(): void {
    this.movies$ = this.store.pipe(select(selectMovies));

    this.store.dispatch(MoviesAction.loadMovies());

    this.actions$
      .pipe(ofType(AppAction.SetFilterSuccess), takeUntil(this.destroy$))
      .subscribe(() => this.store.dispatch(MoviesAction.loadMovies()));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public movieClicked($event: MouseEvent, movie: Movie): void {
    this.store.dispatch(SavedItemsAction.AddItem({ item: movie }));
  }
}
