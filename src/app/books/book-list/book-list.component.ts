import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../shared';
import { Store, select } from '@ngrx/store';
import * as fromApp from 'src/app/reducers';
import { selectBooks } from '../selectors';
import * as BooksAction from '../actions';
import * as SavedItemsAction from '../../saved-items/actions';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  public books$: Observable<Book[]>;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.books$ = this.store.pipe(select(selectBooks));

    this.store.dispatch(BooksAction.loadBooks());
  }

  public bookClicked($event: MouseEvent, book: Book): void {
    this.store.dispatch(SavedItemsAction.AddItem({ item: book }));
  }
}
