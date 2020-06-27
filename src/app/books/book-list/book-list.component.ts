import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActionsSubject, select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import * as AppAction from 'src/app/actions';
import * as fromApp from 'src/app/reducers';
import * as SavedItemsAction from '../../saved-items/actions';
import * as BooksAction from '../actions';
import { selectBooks } from '../selectors';
import { Book } from '../shared';
import { ofType } from '@ngrx/effects';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListComponent implements OnInit {
  public books$: Observable<Book[]>;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private store: Store<fromApp.State>,
    private actions$: ActionsSubject,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.books$ = this.store.pipe(select(selectBooks));

    this.store.dispatch(BooksAction.loadBooks());

    this.actions$
      .pipe(ofType(AppAction.SetFilterSuccess), takeUntil(this.destroy$))
      .subscribe(() => this.store.dispatch(BooksAction.loadBooks()));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public bookClicked($event: MouseEvent, book: Book): void {
    this.router.navigate([`/books/book/${book.id}`]);
  }

  public addToMyListClicked($event: MouseEvent, book: Book): void {
    this.store.dispatch(SavedItemsAction.AddItem({ item: book }));
  }
}
