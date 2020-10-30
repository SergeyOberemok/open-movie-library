import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
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
import { Movie } from '../shared';

@Component({
  selector: 'app-movie-item-sm',
  templateUrl: './movie-item-sm.component.html',
  styleUrls: ['./movie-item-sm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('enabledStateChange', [
      state('active', style({ margin: '0 -30px' })),
      state('inactive', style({ margin: '0' })),
      transition('* => *', animate('300ms'))
    ])
  ]
})
export class MovieItemSmComponent implements OnInit, OnDestroy {
  @Input() movie: Movie;
  @Output() add: EventEmitter<Movie> = new EventEmitter();
  @Input() isActive: boolean;
  @HostBinding('class.active') get isItemActive(): boolean {
    return this.isActive;
  }
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
