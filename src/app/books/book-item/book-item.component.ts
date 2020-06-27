import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { FaIcons } from 'src/app/core/shared';
import * as fromApp from 'src/app/reducers';
import * as SavedItemsAction from 'src/app/saved-items/actions';
import { selectBookById } from '../selectors';
import { Book } from '../shared';

@Component({
  selector: 'app-book-item',
  templateUrl: './book-item.component.html',
  styleUrls: ['./book-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookItemComponent implements OnInit {
  public book$: Observable<Book>;
  public faIcons: FaIcons;

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.State>,
  ) {}

  ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.store.pipe(select(selectBookById, { id: params.get('id') }))
      )
    );

    this.faIcons = {
      heart: faHeart
    };
  }

  public addToMyListClicked($event: MouseEvent, book: Book): void {
    this.store.dispatch(SavedItemsAction.AddItem({ item: book }));
  }
}
