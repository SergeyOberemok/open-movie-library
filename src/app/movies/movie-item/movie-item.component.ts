import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import * as AppAction from 'src/app/actions';
import { FaIcons } from 'src/app/core/shared';
import * as fromApp from 'src/app/reducers';
import * as SavedItemsAction from 'src/app/saved-items/actions';
import { selectMovieById } from '../selectors';
import { Movie } from '../shared';

@Component({
  selector: 'app-movie',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemComponent implements OnInit {
  public movie$: Observable<Movie>;
  public faIcons: FaIcons;
  public imgDefault: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.State>,
  ) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      tap(
        (params: ParamMap) => (
          this.store.dispatch(
            AppAction.setSelectedItemId({ id: params.get('id') })
          )
        )
      ),
      switchMap((params: ParamMap) =>
        this.store.pipe(select(selectMovieById, { id: params.get('id') }))
      )
    );

    this.faIcons = {
      heart: faHeart,
      times: faTimes
    };
  }

  public addToMyListClicked($event: MouseEvent, movie: Movie): void {
    this.store.dispatch(SavedItemsAction.AddItem({ item: movie }));
  }

  public close($event: MouseEvent): void {
    this.router.navigate(['../..'], { relativeTo: this.route });
    this.store.dispatch(AppAction.resetSelectedItemId());
  }
}
