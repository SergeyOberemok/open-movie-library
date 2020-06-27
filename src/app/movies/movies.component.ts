import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as AppAction from '../actions';
import { FaIcons } from '../core/shared';
import * as fromApp from '../reducers';
import { selectSelectedItemId } from '../selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit, OnDestroy {
  public faIcons: FaIcons;
  public genres: string[];
  public isItemSelected: boolean;

  public get reset$(): Observable<void> {
    return this._reset$.asObservable();
  }

  private destroy$: Subject<void> = new Subject();
  private _reset$: Subject<void> = new Subject();

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.faIcons = {
      film: faFilm
    };

    this.genres = ['love', 'horror', 'romantic'];

    this.store
      .pipe(select(selectSelectedItemId), takeUntil(this.destroy$))
      .subscribe((id: string) => (this.isItemSelected = !!id));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public yearPicked(year: number): void {
    this.store.dispatch(AppAction.setYear({ year }));
  }

  public genrePicked(genre: string): void {
    this.store.dispatch(AppAction.setGenre({ genre }));
  }

  public resetFilters(): void {
    this._reset$.next();
    this.store.dispatch(AppAction.resetFilters());
  }
}
