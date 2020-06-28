import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as AppAction from './actions';
import { FaIcons } from './core/shared';
import * as fromApp from './reducers';
import { selectSelectedItemId } from './selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy {
  public faIcons: FaIcons;
  public isMenuOpened: boolean;
  public isItemSelected: boolean;

  private destroy$: Subject<void> = new Subject();

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.faIcons = {
      bars: faBars
    };

    this.store
      .pipe(select(selectSelectedItemId), takeUntil(this.destroy$))
      .subscribe((id: string) => (this.isItemSelected = !!id));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public searchUpdated(search: string): void {
    this.store.dispatch(AppAction.setSearch({ search }));
  }
}
