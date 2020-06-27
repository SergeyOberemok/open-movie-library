import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faFilm, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as AppAction from '../actions';
import { FaIcons } from '../core/shared';
import * as fromApp from '../reducers';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MoviesComponent implements OnInit {
  public faIcons: FaIcons;
  public genres: string[];

  public get reset$(): Observable<void> {
    return this._reset$.asObservable();
  }

  private _reset$: Subject<void> = new Subject();

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.faIcons = {
      film: faFilm,
      times: faTimes
    };

    this.genres = ['love', 'horror', 'romantic'];
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
