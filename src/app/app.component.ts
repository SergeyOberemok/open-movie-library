import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import * as AppAction from './actions';
import { FaIcons } from './core/shared';
import * as fromApp from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  public faIcons: FaIcons;
  public isMenuOpened: boolean;

  constructor(private store: Store<fromApp.State>) {}

  ngOnInit(): void {
    this.faIcons = {
      bars: faBars
    };
  }

  public searchUpdated(search: string): void {
    this.store.dispatch(AppAction.setSearch({ search }));
  }
}
