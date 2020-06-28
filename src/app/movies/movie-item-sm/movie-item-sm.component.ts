import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { FaIcons } from 'src/app/core/shared';
import * as fromApp from 'src/app/reducers';
import * as SavedItemsAction from 'src/app/saved-items/actions';
import { Movie } from '../shared';

@Component({
  selector: 'app-movie-item-sm',
  templateUrl: './movie-item-sm.component.html',
  styleUrls: ['./movie-item-sm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MovieItemSmComponent implements OnInit, OnDestroy {
  @Input() movie: Movie;
  @Output() add: EventEmitter<Movie> = new EventEmitter();
  @HostBinding('class.active') isActive: boolean;
  public imgDefault: string;

  public faIcons: FaIcons;

  private destroy$: Subject<void> = new Subject();

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.faIcons = {
      heart: faHeart
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addToMyListClicked($event: MouseEvent, movie: Movie): void {
    this.add.emit(movie);
  }
}
