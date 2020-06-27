import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as fromApp from 'src/app/reducers';
import { selectFilters } from 'src/app/selectors';
import { Filters } from 'src/app/shared';
import { NameValuePair } from 'src/app/shared/name-value-pair';
import { FaIcons } from '../shared';

@Component({
  selector: 'app-selected-filters',
  templateUrl: './selected-filters.component.html',
  styleUrls: ['./selected-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectedFiltersComponent implements OnInit {
  @Output() reset: EventEmitter<void> = new EventEmitter();

  public filters$: Observable<NameValuePair<string | number>[]>;
  public faIcons: FaIcons;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.filters$ = this.store.pipe(
      select(selectFilters),
      map((filters: Filters) => (filters ? filters.toKeyValue() : []))
    );

    this.faIcons = {
      times: faTimes
    };
  }

  public resetFilters(): void {
    this.reset.emit();
  }
}
