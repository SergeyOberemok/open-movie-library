import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaIcons } from '../shared';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/reducers';
import * as AppAction from '../../actions';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit, OnDestroy {
  public searchForm: FormGroup;
  public faIcons: FaIcons;
  public isFocus: boolean;
  public searchControlName = 'search';

  private destroy$: Subject<void> = new Subject();

  constructor(private fb: FormBuilder, private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.searchForm = this.fb.group({
      [this.searchControlName]: ['']
    });

    this.faIcons = {
      search: faSearch
    };

    this.searchForm.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((form: { [key: string]: string }) =>
        this.store.dispatch(
          AppAction.setSearch({ search: form[this.searchControlName] })
        )
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
