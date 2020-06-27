import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/movies/shared';
import { Book } from 'src/app/books/shared';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'src/app/reducers';
import { selectSavedItems } from '../selectors';

@Component({
  selector: 'app-list',
  templateUrl: './saved-item-list.component.html',
  styleUrls: ['./saved-item-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SavedItemListComponent implements OnInit {
  public items$: Observable<Movie[] | Book[]>;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.items$ = this.store.pipe(select(selectSavedItems));
  }
}
