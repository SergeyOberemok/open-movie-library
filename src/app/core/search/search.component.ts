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
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  pluck,
  takeUntil
} from 'rxjs/operators';
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

  constructor(private fb: FormBuilder) {}

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
        takeUntil(this.destroy$)
      )
      .subscribe((search: string) => this.search.emit(search));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
