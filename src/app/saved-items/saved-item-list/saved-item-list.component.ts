import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as fromApp from 'src/app/reducers';
import { selectSavedItems } from '../selectors';
import { SavedItem } from '../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { selectSelectedItemId, selectSearchFilter } from 'src/app/selectors';
import {
  takeUntil,
  tap,
  withLatestFrom,
  mergeMap,
  concatMap
} from 'rxjs/operators';
import * as SavedItemsAction from '../actions';
import * as AppAction from 'src/app/actions';

@Component({
  selector: 'app-saved-item-list',
  templateUrl: './saved-item-list.component.html',
  styleUrls: ['./saved-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedItemListComponent implements OnInit, OnDestroy {
  public items$: Observable<SavedItem[]>;
  public selectedItemId: string;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromApp.State>,
    private router: Router,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.items$ = this.store.pipe(
      select(selectSavedItems),
      tap(() => this.store.dispatch(AppAction.resetSelectedItemId()))
    );

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

  public itemClicked($event: MouseEvent, item: SavedItem): void {
    this.router.navigate([`/saved-items/${item.itemType}/${item.id}`]);
  }

  public addToMyListClicked(item: SavedItem): void {
    this.store.dispatch(SavedItemsAction.RemoveItem({ item }));

    this.router.navigate(['./'], { relativeTo: this.route });
  }
}
