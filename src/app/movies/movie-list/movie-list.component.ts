import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ofType } from '@ngrx/effects';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import * as AppAction from 'src/app/actions';
import * as fromApp from 'src/app/reducers';
import { selectSelectedItemId } from 'src/app/selectors';
import * as SavedItemsAction from '../../saved-items/actions';
import * as MoviesAction from '../actions';
import { selectMovies } from '../selectors';
import { Movie } from '../shared';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieListComponent implements OnInit, OnDestroy {
  public movies$: Observable<Movie[]>;
  public selectedItemId: string;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromApp.State>,
    private actions$: ActionsSubject,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.movies$ = this.store.pipe(select(selectMovies));

    this.store.dispatch(MoviesAction.loadMovies());

    this.actions$
      .pipe(
        ofType(AppAction.SetFilterSuccess, AppAction.resetFilters),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.store.dispatch(MoviesAction.loadMovies()));

    this.store
      .pipe(select(selectSelectedItemId), takeUntil(this.destroy$))
      .subscribe(
        (selectedItemId: string) => (
          (this.selectedItemId = selectedItemId), this.cd.detectChanges()
        )
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public movieClicked($event: MouseEvent, movie: Movie): void {
    this.router.navigate([`./movie/${movie.id}`], { relativeTo: this.route });
  }

  public addToMyListClicked(movie: Movie): void {
    this.store.dispatch(SavedItemsAction.AddItem({ item: movie }));
  }
}
