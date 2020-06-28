import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  pluck,
  takeUntil,
  filter
} from 'rxjs/operators';
import * as AppAction from 'src/app/actions';
import { FaIcons } from '../shared';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() search: EventEmitter<string> = new EventEmitter();

  public searchForm: FormGroup;
  public faIcons: FaIcons;
  public isFocus: boolean;
  public searchControlName = 'search';

  private destroy$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder, private actions$: ActionsSubject) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      [this.searchControlName]: ['']
    });

    this.faIcons = {
      search: faSearch
    };

    this.searchForm.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        pluck(this.searchControlName),
        filter((search: string) => search !== null),
        takeUntil(this.destroy$)
      )
      .subscribe((search: string) => this.search.emit(search));

    this.actions$
      .pipe(ofType(AppAction.resetFilters), takeUntil(this.destroy$))
      .subscribe(() => this.searchForm.reset());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
