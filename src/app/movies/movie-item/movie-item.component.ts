import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import * as fromApp from 'src/app/reducers';
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

  constructor(
    private route: ActivatedRoute,
    private store: Store<fromApp.State>
  ) {}

  ngOnInit(): void {
    this.movie$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.store.pipe(select(selectMovieById, { id: params.get('id') }))
      )
    );
  }
}
