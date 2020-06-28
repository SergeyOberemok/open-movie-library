import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import * as AppAction from 'src/app/actions';
import * as fromApp from 'src/app/reducers';
import { selectSelectedItemId } from '../selectors';

@Component({
  selector: 'app-saved-items',
  templateUrl: './saved-items.component.html',
  styleUrls: ['./saved-items.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedItemsComponent implements OnInit {
  public isItemSelected: boolean;

  private destroy$: Subject<void> = new Subject();

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.store
      .pipe(select(selectSelectedItemId), takeUntil(this.destroy$))
      .subscribe((id: string) => (this.isItemSelected = !!id));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
