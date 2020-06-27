import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppAction from './actions';
import * as fromApp from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {}

  public searchUpdated(search: string): void {
    this.store.dispatch(AppAction.setSearch({ search }));
  }
}
