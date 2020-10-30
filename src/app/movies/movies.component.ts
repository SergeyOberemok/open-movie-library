import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import { faFilm } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import * as fromApp from 'src/app/reducers';
import * as AppAction from '../actions';
import { FaIcons } from '../core/shared';
import { selectSelectedItemId } from '../selectors';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enabledStateChange', [
      state('default', style({ 'margin-left': 0 })),
      state('selected', style({ 'margin-left': '100px' })),
      transition('* => *', animate('300ms'))
    ])
  ]
})
export class MoviesComponent implements OnInit, OnDestroy {
  public faIcons: FaIcons;
  public genres: string[];
  public isItemSelected: boolean;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromApp.State>,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.faIcons = {
      film: faFilm
    };

    this.genres = ['movie', 'series', 'episode'];

    this.store
      .pipe(select(selectSelectedItemId), takeUntil(this.destroy$))
      .subscribe(
        (id: string) => ((this.isItemSelected = !!id), this.cd.detectChanges())
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public yearPicked(year: number): void {
    this.store.dispatch(AppAction.setYear({ year }));
  }

  public typePicked(type: string): void {
    this.store.dispatch(AppAction.setType({ itemType: type }));
  }

  public resetFilters(): void {
    this.store.dispatch(AppAction.resetFilters());
  }
}
