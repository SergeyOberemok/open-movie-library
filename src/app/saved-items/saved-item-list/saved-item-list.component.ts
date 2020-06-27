import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromApp from 'src/app/reducers';
import { selectSavedItems } from '../selectors';
import { SavedItem } from '../shared';
import { Router } from '@angular/router';

@Component({
  selector: 'app-saved-item-list',
  templateUrl: './saved-item-list.component.html',
  styleUrls: ['./saved-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedItemListComponent implements OnInit {
  public items$: Observable<SavedItem[]>;

  constructor(private store: Store<fromApp.State>, private router: Router) {}

  ngOnInit(): void {
    this.items$ = this.store.pipe(select(selectSavedItems));
  }

  public itemClicked($event: MouseEvent, item: SavedItem): void {
    this.router.navigate([`/saved-items/${item.itemType}/${item.id}`]);
  }
}
